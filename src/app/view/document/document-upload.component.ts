import { ChangeDetectionStrategy, Component, inject, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/document-api.store';
import { DocumentTypeApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/type/document-type-api.store';
import { DocumentTypeDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/type/document-type-dto';
import { EntityType } from '@app/model/bw/co/roguesystems/fsrfp/entity-type';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  template: `
    <div class="upload-container">
      <form [formGroup]="uploadForm" (ngSubmit)="upload()">
        <!-- Document Type Selection -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label translate>document.type.title</mat-label>
          <mat-select formControlName="documentTypeId">
            <mat-option value="">
              <span translate>document.type.placeholder</span>
            </mat-option>
            <mat-option *ngFor="let type of documentTypes()" [value]="type.id">
              {{ type.name }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="uploadForm.get('documentTypeId')?.hasError('required')" translate>
            document.type.error.required
          </mat-error>
        </mat-form-field>

        <!-- File Input -->
        <div class="file-upload-area">
          <input type="file" id="uploadFileInput" (change)="onFileSelected($event)" accept="*/*" hidden />

          <!-- Upload Button or Selected File Display -->
          <div *ngIf="!selectedFile(); else fileSelected" class="upload-prompt">
            <button type="button" mat-raised-button color="primary">
              <mat-icon>upload_file</mat-icon>
              <span translate>document.selectFile</span>
            </button>
            <p class="upload-hint" translate>document.upload.hint</p>
          </div>

          <ng-template #fileSelected>
            <div class="selected-file">
              <div class="file-info">
                <mat-icon>description</mat-icon>
                <div class="file-details">
                  <span class="file-name">{{ selectedFile()?.name }}</span>
                  <span class="file-size">{{ selectedFile()?.size || 0 | number }} bytes</span>
                </div>
              </div>
              <button
                type="button"
                mat-icon-button
                color="warn"
                (click)="removeFile()"
                matTooltip="{{ 'action.remove' | translate }}"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>
          </ng-template>
        </div>

        <!-- Actions -->
        <div class="upload-actions">
          <button type="submit" mat-raised-button color="primary" [disabled]="!canUpload() || loading()">
            <mat-progress-spinner *ngIf="loading()" mode="indeterminate" diameter="20"> </mat-progress-spinner>
            <mat-icon *ngIf="!loading()">cloud_upload</mat-icon>
            <span translate>action.upload</span>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .upload-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .file-upload-area {
        padding: 1.5rem;
        border: 2px dashed var(--mat-sys-outline-variant);
        border-radius: 8px;
        text-align: center;
        background-color: var(--mat-sys-surface-variant);
      }

      .upload-prompt {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .upload-hint {
        margin: 0;
        color: var(--mat-sys-on-surface-variant);
        font-size: 0.875rem;
      }

      .selected-file {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        background-color: var(--mat-sys-surface);
        border-radius: 4px;
        border: 1px solid var(--mat-sys-outline-variant);
      }

      .file-info {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .file-details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .file-name {
        font-weight: 500;
      }

      .file-size {
        font-size: 0.75rem;
        color: var(--mat-sys-on-surface-variant);
      }

      .upload-actions {
        display: flex;
        justify-content: flex-end;
      }

      .full-width {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentUploadComponent {
  private documentStore = inject(DocumentApiStore);
  private documentTypeStore = inject(DocumentTypeApiStore);
  private snackBar = inject(MatSnackBar);

  // Inputs
  target = input.required<EntityType>();
  targetId = input.required<string>();

  // Outputs
  uploadSuccess = output<void>();
  uploadError = output<string>();

  // Signals
  documentTypes = this.documentTypeStore.dataList;
  loading = this.documentStore.loading;
  selectedFile = signal<File | null>(null);

  // Form
  uploadForm = new FormGroup({
    documentTypeId: new FormControl('', Validators.required),
  });

  constructor() {
    this.documentTypeStore.getAll();

    // Watch for upload success
    effect(() => {
      const success = this.documentStore.success();
      if (success) {
        this.snackBar.open('document.upload.success', 'Close', { duration: 3000 });
        this.resetForm();
        this.uploadSuccess.emit();
      }
    });

    // Watch for upload errors
    effect(() => {
      const error = this.documentStore.error();
      if (error) {
        this.snackBar.open('document.upload.error', 'Close', { duration: 3000 });
        this.uploadError.emit(error.message || 'Upload failed');
      }
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
    const fileInput = document.getElementById('uploadFileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  canUpload(): boolean {
    return this.uploadForm.valid && this.selectedFile() !== null;
  }

  upload(): void {
    if (!this.canUpload()) {
      this.uploadForm.markAllAsTouched();
      return;
    }

    const file = this.selectedFile();
    const documentTypeId = this.uploadForm.value.documentTypeId;

    if (!file || !documentTypeId) {
      return;
    }

    this.documentStore.upload({
      target: this.target(),
      targetId: this.targetId(),
      documentTypeId,
      file,
    });
  }

  private resetForm(): void {
    this.uploadForm.reset();
    this.selectedFile.set(null);

    // Reset file input
    const fileInput = document.getElementById('uploadFileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
