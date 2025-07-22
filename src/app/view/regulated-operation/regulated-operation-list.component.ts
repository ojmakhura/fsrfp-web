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

import { RegulatedOperationApiStore } from '@app/store/bw/co/roguesystems/fsrfp/operation/regulated-operation-api.store';
import { RegulatedOperationDTO } from '@app/model/bw/co/roguesystems/fsrfp/operation/regulated-operation-dto';
import { TableComponent } from '@app/components/table/table.component';
import { ColumnModel } from '@app/model/column.model';
import { ActionTemplate } from '@app/model/action-template';

@Component({
  selector: 'app-regulated-operation-list',
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
  templateUrl: './regulated-operation-list.component.html',
  styleUrls: ['./regulated-operation-list.component.scss'],
})
export class RegulatedOperationListComponent implements OnInit {
  // Injected services
  private router = inject(Router);
  private regulatedOperationStore = inject(RegulatedOperationApiStore);

  // Computed signals
  loading = computed(() => this.regulatedOperationStore.loading());
  error = computed(() => this.regulatedOperationStore.error());
  regulatedOperations = this.regulatedOperationStore.dataPage;
  hasData = computed(() => (this.regulatedOperations().content || []).length > 0);

  // Table configuration
  columns: ColumnModel[] = [
    new ColumnModel('name', 'regulated.operation.name', false),
    new ColumnModel('regulator', 'regulated.operation.regulator', false),
  ];

  actions: ActionTemplate[] = [
    new ActionTemplate('view', 'action.view', 'visibility', 'primary'),
    new ActionTemplate('edit', 'action.edit', 'edit', 'accent'),
    new ActionTemplate('delete', 'action.delete', 'delete', 'warn'),
  ];

  // Page title
  pageTitle = computed(() => 'regulated.operation.list.title');

  constructor() {
    console.log('RegulatedOperationListComponent initialized');
  }

  ngOnInit(): void {
    this.loadRegulatedOperations();
  }

  private loadRegulatedOperations(): void {
    this.regulatedOperationStore.getAllPaged({
      pageNumber: 0,
      pageSize: 10,
    });
  }

  onCreate(): void {
    this.router.navigate(['/regulated-operations/create']);
  }

  onView(regulatedOperation: RegulatedOperationDTO): void {
    if (regulatedOperation.id) {
      this.router.navigate(['/regulated-operations/view', regulatedOperation.id]);
    }
  }

  onEdit(regulatedOperation: RegulatedOperationDTO): void {
    if (regulatedOperation.id) {
      this.router.navigate(['/regulated-operations/edit', regulatedOperation.id]);
    }
  }

  onDelete(regulatedOperation: RegulatedOperationDTO): void {
    if (regulatedOperation.id && confirm('Are you sure you want to delete this regulated operation?')) {
      this.regulatedOperationStore.remove({ id: regulatedOperation.id });
    }
  }

  onActionClicked(event: any): void {
    const { action, id } = event;

    switch (action) {
      case 'view':
        this.router.navigate(['/regulated-operations/view', id]);
        break;
      case 'edit':
        this.router.navigate(['/regulated-operations/edit', id]);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this regulated operation?')) {
          this.regulatedOperationStore.remove({ id });
        }
        break;
    }
  }

  onAction(action: string, regulatedOperation: RegulatedOperationDTO): void {
    switch (action) {
      case 'view':
        this.onView(regulatedOperation);
        break;
      case 'edit':
        this.onEdit(regulatedOperation);
        break;
      case 'delete':
        this.onDelete(regulatedOperation);
        break;
    }
  }

  onRefresh(): void {
    this.loadRegulatedOperations();
  }
}
