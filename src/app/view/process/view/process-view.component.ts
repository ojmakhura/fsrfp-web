import { Component, computed, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { ProcessApiStore } from '@app/store/bw/co/roguesystems/fsrfp/process/process-api.store';
import { ProcessDTO } from '@app/model/bw/co/roguesystems/fsrfp/process/process-dto';
import { EntityType } from '@app/model/bw/co/roguesystems/fsrfp/entity-type';
import { DocumentAttachmentComponent } from '@app/view/document';
import { DocumentApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/document-api.store';

@Component({
  selector: 'app-process-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule,
    DocumentAttachmentComponent,
  ],
  templateUrl: './process-view.component.html',
  styleUrls: ['./process-view.component.scss'],
})
export class ProcessViewComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private processStore = inject(ProcessApiStore);
  private documentStore = inject(DocumentApiStore);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private translateService = inject(TranslateService);
  private fb = inject(FormBuilder);

  private destroy$ = new Subject<void>();

  // Signals from store
  readonly process = this.processStore.data;
  readonly loading = this.processStore.loading;
  readonly error = this.processStore.error;

  readonly processId = signal<string | null>(null);

  readonly EntityType = EntityType;

  // Computed properties
  readonly pageTitle = computed(() => {
    const process = this.process();
    return process ? `${process.name}` : 'process.view.title';
  });

  readonly hasDescription = computed(() => {
    const process = this.process();
    return !!(process?.description && process.description.trim());
  });

  constructor() {
    // Reset store when component initializes
    this.processStore.reset();
    this.documentStore.reset();
  }

  ngOnInit(): void {
    this.loadProcess();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProcess(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      console.log(params);
      const id = params['id'];
      console.log('Process ID:', id);
      if (id) {
        this.processId.set(id);
        this.processStore.findById({ id: id });
      } else {
        console.error('No process ID provided in route parameters');
      }
    });
  }

  edit(): void {
    const process = this.process();
    if (process?.id) {
      this.router.navigate(['/process', process.id, 'edit']);
    }
  }

  back(): void {
    this.router.navigate(['/process']);
  }

  viewRegulator(): void {
    const process = this.process();
    if (process?.regulator?.id) {
      this.router.navigate(['/regulator/details', process.regulator.id]);
    }
  }

  private showSuccessMessage(key: string): void {
    this.translateService.get(key).subscribe((message) => {
      this.snackBar.open(message, 'Close', { duration: 3000 });
    });
  }

  private showErrorMessage(key: string): void {
    this.translateService.get(key).subscribe((message) => {
      this.snackBar.open(message, 'Close', { duration: 3000 });
    });
  }
}
