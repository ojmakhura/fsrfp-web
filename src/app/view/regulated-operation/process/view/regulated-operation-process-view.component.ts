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
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { RegulatedOperationProcessApiStore } from '@app/store/bw/co/roguesystems/fsrfp/operation/process/regulated-operation-process-api.store';
import { RegulatedOperationProcessDTO } from '@app/model/bw/co/roguesystems/fsrfp/operation/process/regulated-operation-process-dto';

@Component({
  selector: 'app-regulated-operation-process-view',
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
    MatChipsModule,
    TranslateModule,
  ],
  templateUrl: './regulated-operation-process-view.component.html',
  styleUrls: ['./regulated-operation-process-view.component.scss'],
})
export class RegulatedOperationProcessViewComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private translateService = inject(TranslateService);
  private regulatedOperationProcessStore = inject(RegulatedOperationProcessApiStore);

  private destroy$ = new Subject<void>();

  // Signals from stores
  loading = computed(() => this.regulatedOperationProcessStore.loading());
  error = computed(() => this.regulatedOperationProcessStore.error());
  regulatedOperationProcess = computed(() => this.regulatedOperationProcessStore.data());

  // Page title
  pageTitle = computed(() => {
    const process = this.regulatedOperationProcess();
    return process?.operation ? `${process.operation} - ${process.process}` : 'regulatedOperationProcess.view.title';
  });

  ngOnInit(): void {
    // Get the ID from the route and load the regulated operation process
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.regulatedOperationProcessStore.findById({ id });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEdit(): void {
    const process = this.regulatedOperationProcess();
    if (process?.id) {
      this.router.navigate(['/regulated-operation-processes/edit', process.id]);
    }
  }

  onBack(): void {
    this.router.navigate(['/regulated-operation-processes']);
  }

  onDelete(): void {
    const process = this.regulatedOperationProcess();
    if (process?.id) {
      const confirmMessage =
        this.translateService.instant('confirm.delete.this') +
        this.translateService.instant('regulatedOperationProcess.title').toLowerCase();

      if (confirm(confirmMessage)) {
        this.regulatedOperationProcessStore.remove({ id: process.id });
        this.router.navigate(['/regulated-operation-processes']);
      }
    }
  }
}
