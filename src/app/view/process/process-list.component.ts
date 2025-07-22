import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { ProcessApiStore } from '@app/store/bw/co/roguesystems/fsrfp/process/process-api.store';
import { ProcessDTO } from '@app/model/bw/co/roguesystems/fsrfp/process/process-dto';
import { TableComponent } from '@app/components/table/table.component';
import { ColumnModel } from '@app/model/column.model';
import { ActionTemplate } from '@app/model/action-template';

@Component({
  selector: 'app-process-list',
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
    TranslateModule,
    TableComponent,
  ],
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss'],
})
export class ProcessListComponent implements OnInit {
  // Injected services
  private router = inject(Router);
  private processStore = inject(ProcessApiStore);

  // Computed signals
  loading = computed(() => this.processStore.loading());
  error = computed(() => this.processStore.error());
  processes = this.processStore.dataPage;
  hasData = computed(() => (this.processes().content || []).length > 0);

  // Table configuration
  columns: ColumnModel[] = [
    new ColumnModel('name', 'name', false),
    new ColumnModel('regulator', 'regulator', false),
  ];

  actions: ActionTemplate[] = [
    new ActionTemplate('view', 'action.view', 'visibility', 'tooltip.view'),
    new ActionTemplate('edit', 'action.edit', 'edit', 'tooltip.edit'),
    new ActionTemplate('delete', 'action.delete', 'delete', 'tooltip.delete'),
  ];

  constructor() {
    this.processStore.reset();
  }

  ngOnInit(): void {
    this.loadProcesses();
  }

  /**
   * Load all processes
   */
  loadProcesses(): void {
    this.processStore.getAllPaged({ pageNumber: 0, pageSize: 10 });
  }

  /**
   * Refresh the processes list
   */
  refresh(): void {
    this.loadProcesses();
  }

  /**
   * Navigate to create process page
   */
  createProcess(): void {
    this.router.navigate(['/process/create']);
  }

  /**
   * Handle table action clicks
   */
  onActionClicked(event: any): void {
    const { action, id } = event;

    switch (action) {
      case 'view':
        this.viewProcess(id);
        break;
      case 'edit':
        this.editProcess(id!);
        break;
      case 'delete':
        this.deleteProcess(id!);
        break;
    }
  }

  /**
   * Navigate to view process page
   */
  private viewProcess(id: string): void {
    this.router.navigate(['/process/details', id]);
  }

  /**
   * Navigate to edit process page
   */
  private editProcess(id: string): void {
    this.router.navigate(['/process/edit', id]);
  }

  /**
   * Delete process
   */
  private deleteProcess(id: string): void {
    // TODO: Implement delete confirmation dialog
    this.processStore.remove({ id });
  }

  /**
   * Handle table load event
   */
  onTableLoad(event: any): void {
    // Handle pagination, sorting, etc.
    console.log('Table load event:', event);
  }
}
