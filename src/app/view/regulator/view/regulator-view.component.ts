import { Component, inject, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { RegulatorApiStore } from '@app/store/bw/co/roguesystems/fsrfp/regulator/regulator-api.store';
import { DocumentApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/document-api.store';
import { DocumentTypeApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/type/document-type-api.store';
import { ProcessApiStore } from '@app/store/bw/co/roguesystems/fsrfp/process/process-api.store';
import { DocumentDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/document-dto';
import { DocumentTypeDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/type/document-type-dto';
import { ProcessDTO } from '@app/model/bw/co/roguesystems/fsrfp/process/process-dto';
import { DocumentApi } from '@app/service/bw/co/roguesystems/fsrfp/document/document-api';
import { EntityType } from '@app/model/bw/co/roguesystems/fsrfp/entity-type';
import { DocumentAttachmentComponent } from '../../document/attachment/document-attachment.component';

@Component({
  selector: 'app-regulator-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule,
    DocumentAttachmentComponent,
  ],
  templateUrl: './regulator-view.component.html',
  styleUrls: ['./regulator-view.component.scss'],
})
export class RegulatorViewComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private translateService = inject(TranslateService);
  private regulatorStore = inject(RegulatorApiStore);
  private documentStore = inject(DocumentApiStore);
  private documentTypeStore = inject(DocumentTypeApiStore);
  private processStore = inject(ProcessApiStore);
  private documentApi = inject(DocumentApi);

  private destroy$ = new Subject<void>();

  // Signals from stores
  readonly regulator = this.regulatorStore.data;
  readonly loading = this.regulatorStore.loading;
  readonly error = this.regulatorStore.error;
  readonly documents = this.documentStore.dataList;
  readonly documentsLoading = this.documentStore.loading;
  readonly documentTypes = this.documentTypeStore.dataList;
  readonly processes = this.processStore.dataList;
  readonly processesLoading = this.processStore.loading;

  // Local state
  readonly showDocuments = signal<boolean>(true);
  readonly showProcesses = signal<boolean>(true);
  readonly uploadForm = signal<FormGroup | null>(null);
  readonly selectedFile = signal<File | null>(null);

  readonly EntityType = EntityType;

  // Computed properties
  readonly pageTitle = computed(() => {
    const regulator = this.regulator();
    return regulator ? `regulator.view.title` : 'regulator.view.title';
  });

  readonly documentsGroupedByType = computed(() => {
    const docs = this.documents() as DocumentDTO[];
    const types = this.documentTypes() as DocumentTypeDTO[];

    console.log('Documents:', docs);

    if (!docs || !types) return {};

    const grouped: { [key: string]: { type: DocumentTypeDTO; documents: DocumentDTO[] } } = {};

    // Group documents by type
    docs.forEach((doc) => {
      const type = types.find((t) => t.id === doc.documentTypeId);
      if (type) {
        const typeKey = type.id || 'unknown';
        if (!grouped[typeKey]) {
          grouped[typeKey] = {
            type,
            documents: [],
          };
        }
        grouped[typeKey].documents.push(doc);
      }
    });

    return grouped;
  });

  readonly availableDocumentTypes = computed(() => {
    const types = this.documentTypes() as DocumentTypeDTO[];
    return types || [];
  });

  constructor() {
    console.log('RegulatorViewComponent initialized');
    this.documentStore.reset();
    this.regulatorStore.reset();
    this.documentTypeStore.reset();
    this.initializeUploadForm();
  }

  ngOnInit(): void {
    this.loadRegulator();
    this.loadDocumentTypes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeUploadForm(): void {
    const form = this.fb.group({
      documentTypeId: ['', Validators.required],
      file: [null, Validators.required],
    });
    this.uploadForm.set(form);
  }

  private loadRegulator(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.regulatorStore.findById({ id });
        this.loadDocuments(id);
        this.loadProcesses(id);
      } else {
        console.error('No regulator ID provided in route parameters');
      }
    });
  }

  private loadDocuments(regulatorId: string): void {
    this.documentStore.findByTarget({
      target: EntityType.REGULATOR,
      targetId: regulatorId,
    });
  }

  private loadProcesses(regulatorId: string): void {
    this.processStore.findByRegulator({ regulatorId });
  }

  private loadDocumentTypes(): void {
    this.documentTypeStore.getAll();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);
      const form = this.uploadForm();
      if (form) {
        form.patchValue({ file });
      }
    }
  }

  uploadDocument(): void {
    const form = this.uploadForm();
    const file = this.selectedFile();
    const regulator = this.regulator();

    if (!form || !form.valid || !file || !regulator?.id) {
      this.showErrorMessage('document.upload.invalid');
      return;
    }

    const documentTypeId = form.get('documentTypeId')?.value;

    this.documentApi
      .upload(EntityType.REGULATOR, regulator.id, documentTypeId, file)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (uploadedDocument) => {
          this.showSuccessMessage('document.upload.success');
          this.resetUploadForm();
          this.loadDocuments(regulator.id!);
        },
        error: (error) => {
          console.error('Error uploading document:', error);
          this.showErrorMessage('document.upload.error');
        },
      });
  }

  viewDocumentDetails(doc: DocumentDTO): void {
    if (doc.id) {
      this.router.navigate(['/document/details', doc.id]);
    }
  }

  downloadDocument(doc: DocumentDTO): void {
    if (doc.id) {
      this.documentApi
        .downloadFile(doc.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = window.document.createElement('a');
            link.href = url;
            link.download = doc.filename || 'document';
            link.click();
            window.URL.revokeObjectURL(url);
          },
          error: (error) => {
            console.error('Error downloading document:', error);
            this.showErrorMessage('document.download.error');
          },
        });
    }
  }

  deleteDocument(doc: DocumentDTO): void {
    if (!doc.id) return;

    if (confirm(this.translateService.instant('document.delete.confirm'))) {
      this.documentApi
        .remove(doc.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.showSuccessMessage('document.delete.success');
            const regulator = this.regulator();
            if (regulator?.id) {
              this.loadDocuments(regulator.id);
            }
          },
          error: (error) => {
            console.error('Error deleting document:', error);
            this.showErrorMessage('document.delete.error');
          },
        });
    }
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

  toggleDocumentsSection(): void {
    this.showDocuments.update((value) => !value);
  }

  toggleProcessesSection(): void {
    this.showProcesses.update((value) => !value);
  }

  createProcess(): void {
    const regulator = this.regulator();
    if (regulator?.id) {
      this.router.navigate(['/process/create'], {
        queryParams: { regulatorId: regulator.id },
      });
    }
  }

  viewProcess(process: ProcessDTO): void {
    console.log('Navigating to process details for ID:', process.id);
    this.router.navigate(['/process/details', process.id]);
  }

  editProcess(process: ProcessDTO): void {
    this.router.navigate(['/process/edit', process.id]);
  }

  edit(): void {
    const regulator = this.regulator();
    if (regulator?.id) {
      this.router.navigate(['/regulator/edit', regulator.id]);
    }
  }

  back(): void {
    this.router.navigate(['/regulator']);
  }
}
