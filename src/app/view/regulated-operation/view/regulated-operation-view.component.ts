import { Component, inject, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { RegulatedOperationApiStore } from '@app/store/bw/co/roguesystems/fsrfp/operation/regulated-operation-api.store';
import { RegulatedOperationProcessApiStore } from '@app/store/bw/co/roguesystems/fsrfp/operation/process/regulated-operation-process-api.store';
import { DocumentApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/document-api.store';
import { RegulatedOperationProcessDTO } from '@app/model/bw/co/roguesystems/fsrfp/operation/process/regulated-operation-process-dto';
import { EntityType } from '@app/model/bw/co/roguesystems/fsrfp/entity-type';
import { DocumentAttachmentComponent } from '@app/view/document';

@Component({
  selector: 'app-regulated-operation-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
    TranslateModule,
    DocumentAttachmentComponent,
  ],
  templateUrl: './regulated-operation-view.component.html',
  styleUrls: ['./regulated-operation-view.component.scss'],
})
export class RegulatedOperationViewComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private translateService = inject(TranslateService);
  private regulatedOperationStore = inject(RegulatedOperationApiStore);
  private regulatedOperationProcessStore = inject(RegulatedOperationProcessApiStore);
  private documentStore = inject(DocumentApiStore);

  private destroy$ = new Subject<void>();
  readonly EntityType = EntityType;

  // Signals from stores
  readonly regulatedOperation = this.regulatedOperationStore.data;
  readonly loading = this.regulatedOperationStore.loading;
  readonly error = this.regulatedOperationStore.error;
  readonly processes = this.regulatedOperationProcessStore.dataList;
  readonly processesLoading = this.regulatedOperationProcessStore.loading;
  readonly documents = this.documentStore.dataList;
  readonly documentsLoading = this.documentStore.loading;

  // Local state
  readonly showProcesses = signal<boolean>(true);
  readonly showDocuments = signal<boolean>(true);
  readonly isMobile = signal<boolean>(false);
  readonly isTablet = signal<boolean>(false);

  // Computed properties
  readonly pageTitle = computed(() => {
    const operation = this.regulatedOperation();
    return operation ? operation.name || 'regulatedOperation.view.title' : 'regulatedOperation.view.title';
  });

  // Responsive layout computed properties
  readonly shouldStackVertically = computed(() => {
    return this.isMobile() || window.innerWidth <= 640;
  });

  readonly shouldWrapCards = computed(() => {
    return !this.shouldStackVertically();
  });

  readonly processCardWidth = computed(() => {
    if (this.isMobile()) return '100%';
    if (this.isTablet()) return 'auto'; // Let flex-basis handle it
    return 'auto'; // Let flex-basis handle it
  });

  // Sequenced processes starting from the initial process
  readonly sequencedProcesses = computed(() => {
    const allProcesses = this.processes() as RegulatedOperationProcessDTO[];
    if (!allProcesses || allProcesses.length === 0) return [];

    // Find the initial process
    const initialProcess = allProcesses.find((p) => p.initialProcess);
    if (!initialProcess) {
      // If no initial process is marked, return all processes as-is
      return allProcesses;
    }

    // Build the sequence following the next process chain
    const sequence: RegulatedOperationProcessDTO[] = [];
    let currentProcess: RegulatedOperationProcessDTO | undefined = initialProcess;
    const processedIds = new Set<string>();

    while (currentProcess && !processedIds.has(currentProcess.id!)) {
      sequence.push(currentProcess);
      processedIds.add(currentProcess.id!);

      // Find the next process
      currentProcess = allProcesses.find((p) => p.previousId === currentProcess!.id);
    }

    // Add any remaining processes that aren't in the main sequence
    const remainingProcesses = allProcesses.filter((p) => !processedIds.has(p.id!));
    sequence.push(...remainingProcesses);

    return sequence;
  });

  // Get count of unique processes assigned to this operation
  readonly assignedProcessCount = computed(() => {
    const operation = this.regulatedOperation();
    const allProcesses = this.processes() as RegulatedOperationProcessDTO[];

    if (!operation?.id || !allProcesses) return 0;

    // Count unique process IDs assigned to this operation
    const uniqueProcessIds = new Set(
      allProcesses
        .filter((p) => p.operationId === operation.id)
        .map((p) => p.processId)
        .filter(Boolean),
    );

    return uniqueProcessIds.size;
  });

  constructor() {
    console.log('RegulatedOperationViewComponent initialized');
    this.checkViewport();
    // Listen for window resize events
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.checkViewport());
    }
  }

  ngOnInit(): void {
    this.loadRegulatedOperation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Clean up resize listener
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', () => this.checkViewport());
    }
  }

  private checkViewport(): void {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      this.isMobile.set(width <= 640);
      this.isTablet.set(width > 640 && width <= 768);
    }
  }

  private loadRegulatedOperation(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.regulatedOperationStore.findById({ id });
        this.loadProcesses(id);
        this.loadDocuments(id);
      } else {
        console.error('No regulated operation ID provided in route parameters');
      }
    });
  }

  private loadProcesses(operationId: string): void {
    // Assuming there's a method to find processes by operation
    this.regulatedOperationProcessStore.findByRegulatedOperation({ operationId });
    // this.regulatedOperationProcessStore.getAll();
  }

  private loadDocuments(operationId: string): void {
    this.documentStore.findByTarget({
      target: EntityType.SERVICE, // Using SERVICE as placeholder for regulated operation
      targetId: operationId,
    });
  }

  toggleProcessesSection(): void {
    this.showProcesses.update((value) => !value);
  }

  toggleDocumentsSection(): void {
    this.showDocuments.update((value) => !value);
  }

  viewProcess(process: RegulatedOperationProcessDTO): void {
    if (process.id) {
      this.router.navigate(['/regulated-operation-processes/view', process.id]);
    }
  }

  editProcess(process: RegulatedOperationProcessDTO): void {
    if (process.id) {
      this.router.navigate(['/regulated-operation-processes/edit', process.id]);
    }
  }

  createProcess(): void {
    const operation = this.regulatedOperation();
    if (operation?.id) {
      this.router.navigate(['/regulated-operation-processes/create'], {
        queryParams: { operationId: operation.id },
      });
    }
  }

  getProcessSummaryText(): string {
    const count = this.assignedProcessCount();
    const total = this.sequencedProcesses().length;

    if (count === 0) {
      return 'No processes assigned to this operation yet.';
    } else if (count === 1) {
      return `1 process assigned to this operation.`;
    } else {
      return `${count} processes assigned to this operation.`;
    }
  }

  edit(): void {
    const operation = this.regulatedOperation();
    if (operation?.id) {
      this.router.navigate(['/regulated-operations/edit', operation.id]);
    }
  }

  back(): void {
    this.router.navigate(['/regulated-operations']);
  }

  getProcessCardColor(index: number, process: RegulatedOperationProcessDTO): string {
    // Special color for initial process
    if (process.initialProcess) {
      return 'process-card-primary';
    }

    // Cycle through different colors for regular processes
    const colors = [
      'process-card-blue',
      'process-card-green',
      'process-card-orange',
      'process-card-purple',
      'process-card-teal',
    ];
    return colors[index % colors.length];
  }

  getProcessFlowClass(): string {
    return this.shouldStackVertically() ? 'process-flow vertical-flow' : 'process-flow';
  }

  getArrowIcon(): string {
    return this.shouldStackVertically() ? 'arrow_downward' : 'arrow_forward';
  }

  getArrowIconForIndex(index: number, totalItems: number): string {
    if (this.shouldStackVertically()) {
      return 'arrow_downward';
    }

    // For wrapped layout, calculate if this should be a row-end arrow
    const cardsPerRow = this.getCardsPerRow();
    const currentRow = Math.floor(index / cardsPerRow);
    const nextRow = Math.floor((index + 1) / cardsPerRow);
    const isLastItem = index === totalItems - 1;

    // If the next item will be on a different row, show down arrow
    if (!isLastItem && nextRow > currentRow) {
      return 'arrow_downward';
    }

    return 'arrow_forward';
  }

  private getCardsPerRow(): number {
    if (typeof window === 'undefined') return 4;

    const screenWidth = window.innerWidth;

    // Adjust cards per row based on screen size
    if (screenWidth <= 768) return 2; // Tablet
    if (screenWidth <= 1024) return 3; // Small desktop
    if (screenWidth <= 1280) return 4; // Medium desktop
    return 5; // Large desktop
  }
}
