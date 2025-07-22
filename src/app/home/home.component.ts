import Keycloak from 'keycloak-js';
import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/@shared/shared.module';

// Store imports
import { RegulatedOperationApiStore } from '@app/store/bw/co/roguesystems/fsrfp/operation/regulated-operation-api.store';
import { RegulatedOperationProcessApiStore } from '@app/store/bw/co/roguesystems/fsrfp/operation/process/regulated-operation-process-api.store';
import { DocumentApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/document-api.store';
import { RegulatorApiStore } from '@app/store/bw/co/roguesystems/fsrfp/regulator/regulator-api.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, SharedModule, MaterialModule],
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private regulatedOperationStore = inject(RegulatedOperationApiStore);
  private regulatedOperationProcessStore = inject(RegulatedOperationProcessApiStore);
  private documentStore = inject(DocumentApiStore);
  private regulatorStore = inject(RegulatorApiStore);
  protected keycloak = inject(Keycloak);

  // Signals from stores
  readonly regulatedOperations = this.regulatedOperationStore.dataList;
  readonly processes = this.regulatedOperationProcessStore.dataList;
  readonly documents = this.documentStore.dataList;
  readonly regulators = this.regulatorStore.dataList;

  // Dashboard statistics computed properties
  readonly dashboardStats = computed(() => {
    const operations = this.regulatedOperations() || [];
    const processes = this.processes() || [];
    const documents = this.documents() || [];
    const regulators = this.regulators() || [];

    return {
      totalOperations: operations.length,
      totalProcesses: processes.length,
      totalDocuments: documents.length,
      totalRegulators: regulators.length,
      activeOperations: operations.filter(op => op.status === 'ACTIVE').length,
      pendingOperations: operations.filter(op => op.status === 'PENDING').length,
      completedOperations: operations.filter(op => op.status === 'COMPLETED').length,
    };
  });

  constructor() {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Load all necessary data for the dashboard
    this.regulatedOperationStore.getAll();
    this.regulatedOperationProcessStore.getAll();
    this.documentStore.getAll();
    this.regulatorStore.getAll();
  }

  // Navigation methods
  viewAllOperations(): void {
    this.router.navigate(['/regulated-operations']);
  }

  viewAllProcesses(): void {
    this.router.navigate(['/regulated-operation-processes']);
  }

  viewAllDocuments(): void {
    this.router.navigate(['/documents']);
  }

  viewAllRegulators(): void {
    this.router.navigate(['/regulators']);
  }

  createOperation(): void {
    this.router.navigate(['/regulated-operations/create']);
  }

  createProcess(): void {
    this.router.navigate(['/regulated-operation-processes/create']);
  }

  createRegulator(): void {
    this.router.navigate(['/regulators/create']);
  }

  getStatusColor(status: string): string {
    switch (status?.toUpperCase()) {
      case 'ACTIVE': return 'primary';
      case 'PENDING': return 'warn';
      case 'COMPLETED': return 'accent';
      case 'DRAFT': return 'basic';
      default: return 'basic';
    }
  }

  getStatusIcon(status: string): string {
    switch (status?.toUpperCase()) {
      case 'ACTIVE': return 'play_circle';
      case 'PENDING': return 'pending';
      case 'COMPLETED': return 'check_circle';
      case 'DRAFT': return 'edit';
      default: return 'circle';
    }
  }
}
