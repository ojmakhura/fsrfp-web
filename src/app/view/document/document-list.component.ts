import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/document-api.store';
import { DocumentTypeApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/type/document-type-api.store';
import { DocumentDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/document-dto';
import { DocumentTypeDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/type/document-type-dto';
import { DocumentApi } from '@app/service/bw/co/roguesystems/fsrfp/document/document-api';
import { EntityType } from '@app/model/bw/co/roguesystems/fsrfp/entity-type';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDividerModule } from '@angular/material/divider';
import { ColumnModel } from '@app/model/column.model';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent {
  private documentStore = inject(DocumentApiStore);
  private documentTypeStore = inject(DocumentTypeApiStore);
  private documentApi = inject(DocumentApi);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  // Signals
  documents = this.documentStore.dataList;
  documentTypes = this.documentTypeStore.dataList;
  loading = this.documentStore.loading;
  error = this.documentStore.error;

  // Form controls
  searchControl = new FormControl('');
  typeFilterControl = new FormControl('');
  targetFilterControl = new FormControl('');

  // Table configuration
  displayedColumns: string[] = ['documentType', 'owner', 'filename', 'actions'];

  columns: ColumnModel[] = [
    new ColumnModel('documentType', 'document.type', false),
    new ColumnModel('target', 'Target', true),
    new ColumnModel('filename', 'Filename', false),
  ];

  // Filter options
  targetTypes = Object.values(EntityType);

  // Pagination
  pageSize = signal(10);
  pageIndex = signal(0);
  totalItems = signal(0);

  constructor() {
    this.initializeData();
    this.setupSearch();
  }

  private initializeData(): void {
    this.documentStore.getAll();
    this.documentTypeStore.getAll();
  }

  private setupSearch(): void {
    // Search functionality
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
      if (searchTerm && searchTerm.trim()) {
        this.documentStore.search({ criteria: searchTerm.trim() });
      } else {
        this.documentStore.getAll();
      }
    });

    // Type filter
    this.typeFilterControl.valueChanges.subscribe((typeId) => {
      if (typeId) {
        this.documentStore.findByDocumentType({ documentTypeId: typeId });
      } else {
        this.documentStore.getAll();
      }
    });

    // Target filter
    this.targetFilterControl.valueChanges.subscribe((target) => {
      // This would need target ID as well - implement based on your needs
      if (!target) {
        this.documentStore.getAll();
      }
    });
  }

  getDocumentTypeName(documentTypeId: string | undefined): string {
    if (!documentTypeId) return '';
    const docType = this.documentTypes().find((dt: any) => dt.id === documentTypeId);
    return docType?.name || documentTypeId;
  }

  getTargetDisplay(target: EntityType | undefined): string {
    if (!target) return '';
    return target.toString();
  }

  downloadDocument(doc: DocumentDTO): void {
    if (!doc.id) return;

    this.documentApi.downloadFile(doc.id).subscribe({
      next: (blob: any) => {
        const url = window.URL.createObjectURL(blob);
        const link = window.document.createElement('a');
        link.href = url;
        link.download = doc.filename || 'document';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error: any) => {
        console.error('Download failed:', error);
        this.snackBar.open('document.download.error', 'Close', { duration: 3000 });
      },
    });
  }

  deleteDocument(doc: DocumentDTO): void {
    if (!doc.id) return;

    const confirmed = confirm('document.delete.confirm');
    if (confirmed) {
      this.documentStore.remove({ id: doc.id });
    }
  }

  viewDocument(doc: DocumentDTO): void {
    // Navigate to view component or open in dialog
    // Implementation depends on your routing setup
    this.router.navigate(['/documents/details', doc.id]);
  }

  editDocument(doc: DocumentDTO): void {
    // Navigate to edit component
    // Implementation depends on your routing setup
    this.router.navigate(['/documents/edit', doc.id]);
  }

  clearFilters(): void {
    this.searchControl.setValue('');
    this.typeFilterControl.setValue('');
    this.targetFilterControl.setValue('');
  }

  onPageChange(event: any): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    // Reload data with new pagination
    this.documentStore.getAllPaged({ pageNumber: event.pageIndex, pageSize: event.pageSize });
  }
}
