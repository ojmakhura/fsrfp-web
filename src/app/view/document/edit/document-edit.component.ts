import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { QuillModule } from 'ngx-quill';
import { DocumentApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/document-api.store';
import { DocumentTypeApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/type/document-type-api.store';
import { DocumentDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/document-dto';
import { EntityType } from '@app/model/bw/co/roguesystems/fsrfp/entity-type';

@Component({
  selector: 'app-document-edit',
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
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
    QuillModule,
  ],
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private documentStore = inject(DocumentApiStore);
  private documentTypeStore = inject(DocumentTypeApiStore);
  private snackBar = inject(MatSnackBar);

  // Signals
  document = this.documentStore.data;
  documentTypes = this.documentTypeStore.dataList;
  loading = this.documentStore.loading;
  error = this.documentStore.error;

  // Form
  documentForm: FormGroup;
  selectedFile = signal<File | null>(null);

  // Mode detection
  documentId = signal<string | null>(null);
  isCreate = computed(() => this.documentId() === null);

  // Page title
  pageTitle = computed(() => {
    return this.isCreate() ? 'document.create.title' : 'document.edit.title';
  });

  // Available entity types
  entityTypes = Object.values(EntityType);

  // Quill editor configuration

  quillStyles = {
    height: '200px',
  };

  constructor() {
    console.log('DocumentEditComponent initialized');
    this.documentForm = this.createForm();

    // Watch for document data changes to populate form
    effect(() => {
      const doc = this.document();
      const id = this.documentId();
      if (doc && doc.id === id) {
        this.populateForm(doc);
      }
    });

    // Watch for save success
    effect(() => {
      const success = this.documentStore.success();
      // if (success) {
      //   this.snackBar.open(
      //     this.isCreate() ? 'Document created successfully' : 'Document updated successfully',
      //     'Close',
      //     { duration: 3000 },
      //   );
      //   this.router.navigate(['/documents']);
      // }
    });
  }

  ngOnInit(): void {
    this.initializeData();
    this.handleRouteParams();
  }

  private initializeData(): void {
    this.documentTypeStore.getAll();
  }

  private handleRouteParams(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      const id = params['id'];
      if (id) {
        this.documentId.set(id);
        this.documentStore.findById({ id });
      } else {
        this.documentId.set(null);
        this.documentStore.reset();
      }
    });

    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.documentId.set(id);
    //   this.documentStore.findById({ id });
    // }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      summary: ['', [Validators.required, Validators.maxLength(255)]],
      documentTypeId: ['', Validators.required],
      target: ['', Validators.required],
      url: ['', [Validators.maxLength(500)]],
    });
  }

  private populateForm(doc: DocumentDTO): void {
    this.documentForm.patchValue({
      summary: doc.summary || '',
      documentTypeId: doc.documentTypeId || '',
      target: doc.target || '',
      url: doc.url || '',
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
    }
  }

  removeFile(): void {
    this.selectedFile.set(null);
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  save(): void {
    if (this.documentForm.invalid) {
      this.documentForm.markAllAsTouched();
      return;
    }

    const formValue = this.documentForm.value;
    const document = new DocumentDTO();

    Object.assign(document, formValue);

    if (!this.isCreate()) {
      const id = this.documentId();
      if (id) {
        document.id = id;
      }
    }

    this.documentStore.save({ document });
  }

  cancel(): void {
    this.router.navigate(['/documents']);
  }

  back(): void {
    this.router.navigate(['/documents']);
  }

  // Helper methods for form validation
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.documentForm.get(fieldName);
    if (!field) return false;

    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched);
    }
    return field.invalid && (field.dirty || field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.documentForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;

    if (errors['required']) {
      return `${fieldName}.error.required`;
    }
    if (errors['maxlength']) {
      return `${fieldName}.error.maxlength`;
    }

    return '';
  }

  getDocumentTypeName(documentTypeId: string): string {
    const docType = this.documentTypes().find((dt: any) => dt.id === documentTypeId);
    return docType?.name || documentTypeId;
  }

  canSave(): boolean {
    return this.documentForm.valid;
  }
}
