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
import { ProcessApiStore } from '@app/store/bw/co/roguesystems/fsrfp/process/process-api.store';
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
  private processStore = inject(ProcessApiStore);
  private documentStore = inject(DocumentApiStore);
  private regulatorStore = inject(RegulatorApiStore);
  protected keycloak = inject(Keycloak);

  // Signals from stores
  readonly regulatedOperations = this.regulatedOperationStore.dataList;
  readonly processes = this.processStore.dataList;
  readonly documents = this.documentStore.dataList;
  readonly regulators = this.regulatorStore.dataList;

  // Search functionality
  readonly searchTerm = signal('');

  // Table column definitions for search results
  readonly operationsDisplayedColumns: string[] = ['name', 'regulator', 'actions'];
  readonly processesDisplayedColumns: string[] = ['name', 'description', 'regulator', 'actions'];
  readonly documentsDisplayedColumns: string[] = ['filename', 'documentType', 'owner', 'actions'];
  readonly regulatorsDisplayedColumns: string[] = ['name', 'abbreviation', 'website', 'actions'];

  // Filtered data based on search term
  readonly filteredOperations = computed(() => {
    const operations = this.regulatedOperations() || [];
    const search = this.searchTerm().toLowerCase().trim();

    if (!search) return operations;

    return operations.filter(
      (op) => op.name?.toLowerCase().includes(search) || op.description?.toLowerCase().includes(search),
    );
  });

  readonly filteredProcesses = computed(() => {
    const processes = this.processes() || [];
    const search = this.searchTerm().toLowerCase().trim();

    if (!search) return processes;

    return processes.filter(
      (process) => process.name?.toLowerCase().includes(search) || process.description?.toLowerCase().includes(search),
    );
  });

  readonly filteredDocuments = computed(() => {
    const documents = this.documents() || [];
    const search = this.searchTerm().toLowerCase().trim();

    if (!search) return documents;

    return documents.filter(
      (doc) =>
        doc.filename?.toLowerCase().includes(search) ||
        doc.summary?.toLowerCase().includes(search) ||
        doc.documentType?.toLowerCase().includes(search) ||
        doc.owner?.toLowerCase().includes(search) ||
        doc.url?.toLowerCase().includes(search),
    );
  });

  readonly filteredRegulators = computed(() => {
    const regulators = this.regulators() || [];
    const search = this.searchTerm().toLowerCase().trim();

    if (!search) return regulators;

    return regulators.filter(
      (regulator) =>
        regulator.name?.toLowerCase().includes(search) ||
        regulator.description?.toLowerCase().includes(search) ||
        regulator.abbreviation?.toLowerCase().includes(search) ||
        regulator.website?.toLowerCase().includes(search) ||
        regulator.contactEmail?.toLowerCase().includes(search),
    );
  });

  // Dashboard statistics computed properties based on filtered data
  readonly dashboardStats = computed(() => {
    const operations = this.filteredOperations();
    const processes = this.filteredProcesses();
    const documents = this.filteredDocuments();
    const regulators = this.filteredRegulators();

    return {
      totalOperations: operations.length,
      totalProcesses: processes.length,
      totalDocuments: documents.length,
      totalRegulators: regulators.length,
      activeOperations: operations.filter((op) => op.status === 'ACTIVE').length,
      pendingOperations: operations.filter((op) => op.status === 'PENDING').length,
      completedOperations: operations.filter((op) => op.status === 'COMPLETED').length,
    };
  });

  constructor() {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Load all necessary data for the dashboard
    this.regulatedOperationStore.getAll();
    this.processStore.getAll();
    this.documentStore.getAll();
    this.regulatorStore.getAll();
  }

  // Search methods
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  // Navigation methods
  viewAllOperations(): void {
    this.router.navigate(['/regulated-operations']);
  }

  viewAllProcesses(): void {
    this.router.navigate(['/processes']);
  }

  viewAllDocuments(): void {
    this.router.navigate(['/documents']);
  }

  viewAllRegulators(): void {
    this.router.navigate(['/regulators']);
  }

  viewOperation(operation: any): void {
    this.router.navigate(['/regulated-operations/view', operation.id]);
  }

  viewProcess(process: any): void {
    this.router.navigate(['/processes/details', process.id]);
  }

  viewDocument(document: any): void {
    this.router.navigate(['/documents/details', document.id]);
  }

  viewRegulator(regulator: any): void {
    this.router.navigate(['/regulators/details', regulator.id]);
  }

  createOperation(): void {
    this.router.navigate(['/regulated-operations/create']);
  }

  createProcess(): void {
    this.router.navigate(['/processes/create']);
  }

  createRegulator(): void {
    this.router.navigate(['/regulators/create']);
  }

  getStatusColor(status: string): string {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return 'primary';
      case 'PENDING':
        return 'warn';
      case 'COMPLETED':
        return 'accent';
      case 'DRAFT':
        return 'basic';
      default:
        return 'basic';
    }
  }

  getStatusIcon(status: string): string {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return 'play_circle';
      case 'PENDING':
        return 'pending';
      case 'COMPLETED':
        return 'check_circle';
      case 'DRAFT':
        return 'edit';
      default:
        return 'circle';
    }
  }
}
