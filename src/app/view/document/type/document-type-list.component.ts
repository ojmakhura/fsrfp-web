import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { TableComponent } from '@app/components/table/table.component';
import { MaterialModule } from '@app/material.module';
import { ActionTemplate } from '@app/model/action-template';
import { ColumnModel } from '@app/model/column.model';
import { Page } from '@app/model/page.model';
import { DocumentTypeDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/type/document-type-dto';
import { DocumentTypeApi } from '@app/service/bw/co/roguesystems/fsrfp/document/type/document-type-api';

@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    TableComponent,
  ],
})
export class DocumentTypeListComponent implements OnInit {
  // Signals for reactive state management
  documentTypes = signal<DocumentTypeDTO[]>([]);
  pagedDocumentTypes = signal<Page<DocumentTypeDTO>>(new Page<DocumentTypeDTO>());
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Computed signals
  hasData = computed(() => this.documentTypes().length > 0);

  // Table configuration
  columns: ColumnModel[] = [
    new ColumnModel('code', 'document.type.code', false),
    new ColumnModel('name', 'document.type.name', false),
    new ColumnModel('description', 'document.type.description', false),
  ];

  actions: ActionTemplate[] = [
    new ActionTemplate('edit', 'action.edit', 'edit', 'tooltip.edit'),
    new ActionTemplate('delete', 'action.delete', 'delete', 'tooltip.delete'),
  ];

  // Pagination settings
  pageSize = 10;
  pageNumber = 0;

  constructor(
    private documentTypeApi: DocumentTypeApi,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDocumentTypes();
  }

  /**
   * Load all document types
   */
  loadDocumentTypes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.documentTypeApi.getAll().subscribe({
      next: (data: DocumentTypeDTO[]) => {
        this.documentTypes.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading document types:', error);
        this.error.set('error.loading.document.types');
        this.loading.set(false);
      },
    });
  }

  /**
   * Load paged document types
   */
  loadPagedDocumentTypes(pageNumber: number = 0, pageSize: number = 10): void {
    this.loading.set(true);
    this.error.set(null);

    this.documentTypeApi.getAllPaged(pageNumber, pageSize).subscribe({
      next: (data: Page<DocumentTypeDTO>[]) => {
        if (data && data.length > 0) {
          this.pagedDocumentTypes.set(data[0]);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading paged document types:', error);
        this.error.set('error.loading.document.types');
        this.loading.set(false);
      },
    });
  }

  /**
   * Handle table actions
   */
  onActionClicked(event: { action: string; id: string }): void {
    const { action, id } = event;

    switch (action) {
      case 'view':
        this.viewDocumentType(id);
        break;
      case 'edit':
        this.editDocumentType(id);
        break;
      case 'delete':
        this.deleteDocumentType(id);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  /**
   * Handle table pagination
   */
  onTableLoad(event: { pageNumber: number; pageSize: number }): void {
    this.pageNumber = event.pageNumber;
    this.pageSize = event.pageSize;
    this.loadPagedDocumentTypes(this.pageNumber, this.pageSize);
  }

  /**
   * Navigate to create new document type
   */
  createDocumentType(): void {
    this.router.navigate(['/admin/document-types/edit']);
  }

  /**
   * Navigate to view document type details
   */
  viewDocumentType(id: string): void {
    this.router.navigate(['/admin/document-types/view', id]);
  }

  /**
   * Navigate to edit document type
   */
  editDocumentType(id: string): void {
    this.router.navigate(['/admin/document-types/edit', id]);
  }

  /**
   * Delete document type with confirmation
   */
  deleteDocumentType(id: string): void {
    if (confirm('Are you sure you want to delete this document type?')) {
      this.loading.set(true);

      // For now, just reload the list
      this.loadDocumentTypes();
    }
  }

  /**
   * Refresh the document types list
   */
  refresh(): void {
    this.loadDocumentTypes();
  }
}
