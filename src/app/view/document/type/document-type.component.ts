import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, inject, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MaterialModule } from '@app/material.module';
import { DocumentTypeDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/type/document-type-dto';
import { DocumentTypeApi } from '@app/service/bw/co/roguesystems/fsrfp/document/type/document-type-api';
import { DocumentTypeApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/type/document-type-api.store';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
  ],
})
export class DocumentTypeComponent implements OnInit {
  // Injected services
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);
  private documentTypeApi = inject(DocumentTypeApi);
  protected documentTypeApiStore = inject(DocumentTypeApiStore);

  // Signals for reactive state management
  documentType = this.documentTypeApiStore.data;
  loading = signal<boolean>(false);
  saving = signal<boolean>(false);
  error = signal<string | null>(null);

  // Form and mode properties
  documentTypeForm!: FormGroup;
  isEditMode = false;
  isViewMode = false;
  documentTypeId: string | null = null;

  constructor() {
    this.initializeForm();

    effect(() => {
      let documentType = this.documentTypeApiStore.data();
      if (documentType) {
        // this.documentType.set(documentType);
        this.patchForm(documentType);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.documentTypeId = params['id'];

      console.log('Document Type ID:', this.documentTypeId);

      // Determine component mode based on route
      const routePath = this.route.snapshot.routeConfig?.path || '';
      this.isEditMode = routePath.includes('edit');
      this.isViewMode = routePath.includes('view');

      if (this.documentTypeId) {
        // this.loadDocumentType(this.documentTypeId);
        console.log('Loading document type with ID:', this.documentTypeId);
        this.documentTypeApiStore.findById({ id: this.documentTypeId });
      }

      if (this.isViewMode) {
        this.documentTypeForm.disable();
      }
    });
  }

  /**
   * Initialize the reactive form
   */
  private initializeForm(): void {
    this.documentTypeForm = this.fb.group({
      id: [null],
      createdAt: [null],
      createdBy: [null],
      modifiedBy: [null],
      modifiedAt: [null],
      code: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }

  /**
   * Load document type by ID
   */
  private loadDocumentType(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    // this.documentTypeApi.findById(id).subscribe({
    //   next: (documentType: DocumentTypeDTO) => {
    //     this.documentType.set(documentType);
    //     this.patchForm(documentType);
    //     this.loading.set(false);
    //   },
    //   error: (error) => {
    //     console.error('Error loading document type:', error);
    //     this.error.set('error.loading.document.type');
    //     this.loading.set(false);
    //     this.showErrorMessage('error.loading.document.type');
    //   }
    // });
  }

  /**
   * Patch form with document type data
   */
  private patchForm(documentType: DocumentTypeDTO): void {
    this.documentTypeForm.patchValue(documentType);
  }

  /**
   * Save document type (create or update)
   */
  save(): void {
    if (this.documentTypeForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    const formData = this.documentTypeForm.value;
    const documentType = new DocumentTypeDTO();

    // Copy form data to DTO
    Object.assign(documentType, formData);

    if (this.isEditMode && this.documentTypeId) {
      // Copy existing properties for update
      // Object.assign(documentType, this.documentType());
      Object.assign(documentType, formData);

      this.updateDocumentType(documentType);
    } else {
      this.createDocumentType(documentType);
    }
  }

  /**
   * Create new document type
   */
  private createDocumentType(documentType: DocumentTypeDTO): void {
    // Note: Assuming there's a create method in the API
    // this.documentTypeApi.create(documentType).subscribe({
    //   next: (createdDocumentType: DocumentTypeDTO) => {
    //     this.saving.set(false);
    //     this.showSuccessMessage('document.type.created.successfully');
    //     this.router.navigate(['/document/type']);
    //   },
    //   error: (error) => {
    //     console.error('Error creating document type:', error);
    //     this.error.set('error.creating.document.type');
    //     this.saving.set(false);
    //     this.showErrorMessage('error.creating.document.type');
    //   }
    // });

    this.documentTypeApiStore.save({ documentType });

    // Simulate creation for now
    setTimeout(() => {
      this.saving.set(false);
      this.showSuccessMessage('document.type.created.successfully');
      this.router.navigate(['/document/type']);
    }, 1000);
  }

  /**
   * Update existing document type
   */
  private updateDocumentType(documentType: DocumentTypeDTO): void {
    // Note: Assuming there's an update method in the API
    // this.documentTypeApi.update(this.documentTypeId!, documentType).subscribe({
    //   next: (updatedDocumentType: DocumentTypeDTO) => {
    //     this.saving.set(false);
    //     this.showSuccessMessage('document.type.updated.successfully');
    //     this.router.navigate(['/document/type']);
    //   },
    //   error: (error) => {
    //     console.error('Error updating document type:', error);
    //     this.error.set('error.updating.document.type');
    //     this.saving.set(false);
    //     this.showErrorMessage('error.updating.document.type');
    //   }
    // });

    // Simulate update for now
    setTimeout(() => {
      this.saving.set(false);
      this.showSuccessMessage('document.type.updated.successfully');
      this.router.navigate(['/document/type']);
    }, 1000);
  }

  /**
   * Cancel and navigate back to list
   */
  cancel(): void {
    this.router.navigate(['/document/type']);
  }

  /**
   * Navigate to edit mode (from view mode)
   */
  edit(): void {
    if (this.documentTypeId) {
      this.router.navigate(['/document/type/edit', this.documentTypeId]);
    }
  }

  /**
   * Get the page title based on mode
   */
  get pageTitle(): string {
    if (this.isEditMode) {
      return 'document.type.edit.title';
    } else if (this.isViewMode) {
      return 'document.type.view.title';
    } else {
      return 'document.type.create.title';
    }
  }

  /**
   * Get the save button label based on mode
   */
  get saveButtonLabel(): string {
    return this.isEditMode ? 'action.update' : 'action.create';
  }

  /**
   * Mark all form controls as touched to show validation errors
   */
  private markFormGroupTouched(): void {
    Object.keys(this.documentTypeForm.controls).forEach((key) => {
      this.documentTypeForm.get(key)?.markAsTouched();
    });
  }

  /**
   * Show success message
   */
  private showSuccessMessage(messageKey: string): void {
    const message = this.translateService.instant(messageKey);
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  /**
   * Show error message
   */
  private showErrorMessage(messageKey: string): void {
    const message = this.translateService.instant(messageKey);
    this.snackBar.open(message, this.translateService.instant('action.close'), {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  /**
   * Get form control for template access
   */
  getFormControl(controlName: string) {
    return this.documentTypeForm.get(controlName);
  }

  /**
   * Check if form control has error
   */
  hasFormControlError(controlName: string, errorType: string): boolean {
    const control = this.getFormControl(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

  /**
   * Get form control error message
   */
  getFormControlErrorMessage(controlName: string): string {
    const control = this.getFormControl(controlName);
    if (!control || !control.errors) {
      return '';
    }

    if (control.hasError('required')) {
      return this.translateService.instant('validation.required', {
        field: this.translateService.instant(`document.type.${controlName}`),
      });
    }

    if (control.hasError('maxlength')) {
      const maxLength = control.errors['maxlength'].requiredLength;
      return this.translateService.instant('validation.maxlength', {
        field: this.translateService.instant(`document.type.${controlName}`),
        maxLength,
      });
    }

    return '';
  }
}
