import { Component, computed, inject, input, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { DocumentApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/document-api.store';
import { DocumentTypeApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/type/document-type-api.store';
import { DocumentDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/document-dto';
import { DocumentTypeDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/type/document-type-dto';
import { DocumentApi } from '@app/service/bw/co/roguesystems/fsrfp/document/document-api';
import { EntityType } from '@app/model/bw/co/roguesystems/fsrfp/entity-type';
import { LoaderComponent } from '@app/@shared';

@Component({
  selector: 'app-document-attachment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    TranslateModule,
    LoaderComponent,
  ],
  templateUrl: './document-attachment.component.html',
  styleUrls: ['./document-attachment.component.scss'],
})
export class DocumentAttachmentComponent implements OnInit, OnDestroy {
  // Inputs
  readonly entityType = input.required<EntityType>();
  readonly entityId = input.required<string | number>();
  readonly title = input<string>('document.title');
  readonly allowUpload = input<boolean>(true);
  readonly allowDownload = input<boolean>(true);
  readonly allowDelete = input<boolean>(true);
  readonly collapsible = input<boolean>(true);

  // Injected services
  private documentApiStore = inject(DocumentApiStore);
  private documentTypeApiStore = inject(DocumentTypeApiStore);
  private documentApi = inject(DocumentApi);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);
  private fb = inject(FormBuilder);

  private destroy$ = new Subject<void>();

  // Signals from store
  readonly documents = this.documentApiStore.dataList;
  readonly documentTypes = this.documentTypeApiStore.dataList;
  readonly documentsLoading = this.documentApiStore.loading;

  // Local state signals
  readonly selectedFile = signal<File | null>(null);
  readonly uploadForm = signal<FormGroup | null>(null);
  readonly showDocuments = signal<boolean>(true);

  // Computed properties
  readonly documentsGroupedByType = computed(() => {
    const docs = this.documents() as DocumentDTO[];

    console.log('Documents:', docs);

    const types = this.documentTypes() as DocumentTypeDTO[];

    if (!docs || !types) return {};

    const grouped: { [key: string]: { type: DocumentTypeDTO; documents: DocumentDTO[] } } = {};

    // Initialize groups for all document types
    types.forEach((type) => {
      grouped[type.code!] = {
        type,
        documents: [],
      };
    });

    // Group documents by type
    docs.forEach((doc) => {
      if (doc.documentTypeCode && grouped[doc.documentTypeCode]) {
        grouped[doc.documentTypeCode].documents.push(doc);
      }
    });

    console.log('Grouped Documents:', grouped);
    return grouped;
  });

  readonly availableDocumentTypes = computed(() => {
    const types = this.documentTypes() as DocumentTypeDTO[];
    return types || [];
  });

  ngOnInit(): void {
    this.initializeUploadForm();
    this.loadDocumentTypes();
    this.loadDocuments();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeUploadForm(): void {
    const form = this.fb.group({
      documentTypeId: ['', Validators.required],
    });
    this.uploadForm.set(form);
  }

  private loadDocuments(): void {
    console.log('Loading documents for entity:', this.entityType(), this.entityId());
    this.documentApiStore.findByTarget({
      target: this.entityType(),
      targetId: this.entityId().toString(),
    });
  }

  private loadDocumentTypes(): void {
    this.documentTypeApiStore.getAll();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);
    }
  }

  uploadDocument(): void {
    const form = this.uploadForm();
    const file = this.selectedFile();

    if (!form || !form.valid || !file) {
      this.showErrorMessage('document.upload.invalid');
      return;
    }

    const documentTypeId = form.get('documentTypeId')?.value;

    this.documentApi
      .upload(this.entityType(), this.entityId().toString(), documentTypeId, file)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (uploadedDocument: any) => {
          this.showSuccessMessage('document.upload.success');
          this.resetUploadForm();
          this.loadDocuments();
        },
        error: (error: any) => {
          console.error('Error uploading document:', error);
          this.showErrorMessage('document.upload.error');
        },
      });
  }

  downloadDocument(document: DocumentDTO): void {
    if (document.id) {
      this.documentApi
        .downloadFile(document.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (blob: any) => {
            const url = window.URL.createObjectURL(blob);
            const link = window.document.createElement('a');
            link.href = url;
            link.download = document.filename || 'document';
            link.click();
            window.URL.revokeObjectURL(url);
          },
          error: (error: any) => {
            console.error('Error downloading document:', error);
            this.showErrorMessage('document.download.error');
          },
        });
    }
  }

  deleteDocument(document: DocumentDTO): void {
    if (!document.id) return;

    if (confirm(this.translateService.instant('document.delete.confirm'))) {
      this.documentApi
        .remove(document.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.showSuccessMessage('document.delete.success');
            this.loadDocuments();
          },
          error: (error: any) => {
            console.error('Error deleting document:', error);
            this.showErrorMessage('document.delete.error');
          },
        });
    }
  }

  toggleDocumentsSection(): void {
    this.showDocuments.update((value) => !value);
  }

  private resetUploadForm(): void {
    const form = this.uploadForm();
    if (form) {
      form.reset();
    }
    this.selectedFile.set(null);

    // Clear file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private showSuccessMessage(messageKey: string): void {
    const message = this.translateService.instant(messageKey);
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  private showErrorMessage(messageKey: string): void {
    const message = this.translateService.instant(messageKey);
    this.snackBar.open(message, this.translateService.instant('action.close'), {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
}
