import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { TableComponent } from '../../components/table/table.component';
import { RegulatorApiStore } from '@app/store/bw/co/roguesystems/fsrfp/regulator/regulator-api.store';
import { ActionTemplate } from '@app/model/action-template';
import { ColumnModel } from '@app/model/column.model';
import { RegulatorDTO } from '@app/model/bw/co/roguesystems/fsrfp/regulator/regulator-dto';

@Component({
  selector: 'app-regulator-list',
  templateUrl: './regulator-list.component.html',
  styleUrls: ['./regulator-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
    TableComponent,
  ],
})
export class RegulatorListComponent implements OnInit {
  // Injected services
  private regulatorStore = inject(RegulatorApiStore);
  private router = inject(Router);

  // Signals for reactive state management
  regulators = this.regulatorStore.dataPage;
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Computed signals
  hasData = computed(() => (this.regulators().content || []).length > 0);

  // Table configuration
  columns: ColumnModel[] = [
    new ColumnModel('abbreviation', 'regulator.abbreviation', false),
    new ColumnModel('name', 'regulator.name', false),
    new ColumnModel('website', 'regulator.website', false),
    new ColumnModel('contactEmail', 'regulator.contactEmail', false),
  ];

  actions: ActionTemplate[] = [
    new ActionTemplate('view', 'action.view', 'visibility', 'tooltip.view'),
    new ActionTemplate('edit', 'action.edit', 'edit', 'tooltip.edit'),
    new ActionTemplate('delete', 'action.delete', 'delete', 'tooltip.delete'),
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadRegulators();
  }

  /**
   * Load all regulators
   */
  loadRegulators(): void {
    this.regulatorStore.getAllPaged({
      pageSize: 10,
      pageNumber: 0,
    });
  }

  /**
   * Handle table actions
   */
  onActionClicked(event: { action: string; id: string }): void {
    const { action, id } = event;

    switch (action) {
      case 'view':
        this.viewRegulator(id);
        break;
      case 'edit':
        this.editRegulator(id);
        break;
      case 'delete':
        this.deleteRegulator(id);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  /**
   * Navigate to create new regulator
   */
  createRegulator(): void {
    this.router.navigate(['/regulator/new']);
  }

  /**
   * Navigate to view regulator details
   */
  viewRegulator(id: string): void {
    console.log('View regulator:', id);
    this.router.navigate(['/regulator/details', id]);
  }

  /**
   * Navigate to edit regulator
   */
  editRegulator(id: string): void {
    this.router.navigate(['/regulator/edit', id]);
  }

  /**
   * Delete regulator with confirmation
   */
  deleteRegulator(id: string): void {
    if (confirm('Are you sure you want to delete this regulator?')) {
      this.loading.set(true);

      // For now, just reload the list
      this.loadRegulators();
    }
  }

  /**
   * Refresh the regulators list
   */
  refresh(): void {
    this.loadRegulators();
  }
}
