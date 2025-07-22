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

import { RegulatedOperationProcessApiStore } from '@app/store/bw/co/roguesystems/fsrfp/operation/process/regulated-operation-process-api.store';
import { RegulatedOperationProcessDTO } from '@app/model/bw/co/roguesystems/fsrfp/operation/process/regulated-operation-process-dto';
import { TableComponent } from '@app/components/table/table.component';
import { ColumnModel } from '@app/model/column.model';
import { ActionTemplate } from '@app/model/action-template';

@Component({
  selector: 'app-regulated-operation-process-list',
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
  templateUrl: './regulated-operation-process-list.component.html',
  styleUrls: ['./regulated-operation-process-list.component.scss'],
})
export class RegulatedOperationProcessListComponent implements OnInit {
  // Injected services
  private router = inject(Router);
  private regulatedOperationProcessStore = inject(RegulatedOperationProcessApiStore);

  // Computed signals
  loading = this.regulatedOperationProcessStore.loading;
  error = computed(() => this.regulatedOperationProcessStore.error());
  regulatedOperationProcesses = this.regulatedOperationProcessStore.dataPage;
  hasData = computed(() => (this.regulatedOperationProcesses().content || []).length > 0);

  // Table configuration
  columns: ColumnModel[] = [
    new ColumnModel('operation', 'operation', false),
    new ColumnModel('process', 'process', false),
    new ColumnModel('initialProcess', 'initialProcess', false),
    new ColumnModel('next', 'nextProcess', false),
  ];

  actions: ActionTemplate[] = [
    new ActionTemplate('view', 'action.view', 'visibility', 'primary'),
    new ActionTemplate('edit', 'action.edit', 'edit', 'accent'),
    new ActionTemplate('delete', 'action.delete', 'delete', 'warn'),
  ];

  // Page title
  pageTitle = computed(() => 'regulated.operation.process.list.title');

  constructor() {
    this.regulatedOperationProcessStore.reset();
  }

  ngOnInit(): void {
    this.loadRegulatedOperationProcesses();
  }

  private loadRegulatedOperationProcesses(): void {
    this.regulatedOperationProcessStore.getAllPaged({
      pageNumber: 0,
      pageSize: 10,
    });
  }

  onCreate(): void {
    this.router.navigate(['/regulated-operation-processes/create']);
  }

  onView(regulatedOperationProcess: RegulatedOperationProcessDTO): void {
    if (regulatedOperationProcess.id) {
      this.router.navigate(['/regulated-operation-processes/view', regulatedOperationProcess.id]);
    }
  }

  onEdit(regulatedOperationProcess: RegulatedOperationProcessDTO): void {
    if (regulatedOperationProcess.id) {
      this.router.navigate(['/regulated-operation-processes/edit', regulatedOperationProcess.id]);
    }
  }

  onDelete(regulatedOperationProcess: RegulatedOperationProcessDTO): void {
    if (regulatedOperationProcess.id && confirm('Are you sure you want to delete this regulated operation process?')) {
      this.regulatedOperationProcessStore.remove({ id: regulatedOperationProcess.id });
    }
  }

  onActionClicked(event: any): void {
    const { action, id } = event;

    switch (action) {
      case 'view':
        this.router.navigate(['/regulated-operation-processes/view', id]);
        break;
      case 'edit':
        this.router.navigate(['/regulated-operation-processes/edit', id]);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this regulated operation process?')) {
          this.regulatedOperationProcessStore.remove({ id });
        }
        break;
    }
  }

  onAction(action: string, regulatedOperationProcess: RegulatedOperationProcessDTO): void {
    switch (action) {
      case 'view':
        this.onView(regulatedOperationProcess);
        break;
      case 'edit':
        this.onEdit(regulatedOperationProcess);
        break;
      case 'delete':
        this.onDelete(regulatedOperationProcess);
        break;
    }
  }

  onRefresh(): void {
    this.loadRegulatedOperationProcesses();
  }
}
