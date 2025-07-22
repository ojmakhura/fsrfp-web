import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ProcessApiStore } from '@app/store/bw/co/roguesystems/fsrfp/process/process-api.store';
import { RegulatorApiStore } from '@app/store/bw/co/roguesystems/fsrfp/regulator/regulator-api.store';
import { ProcessDTO } from '@app/model/bw/co/roguesystems/fsrfp/process/process-dto';
import { RegulatorDTO } from '@app/model/bw/co/roguesystems/fsrfp/regulator/regulator-dto';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule,
    QuillEditorComponent,
  ],
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
})
export class ProcessComponent {
  // Injected services
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);
  private processStore = inject(ProcessApiStore);
  private regulatorStore = inject(RegulatorApiStore);

  // Form
  processForm!: FormGroup;

  // State
  private processId = signal<number | null>(null);
  private mode = signal<'create' | 'edit' | 'view'>('create');

  // Computed properties
  process = computed(() => this.processStore.data());
  loading = computed(() => this.processStore.loading());
  saving = computed(() => this.processStore.loading());
  error = computed(() => this.processStore.error());
  regulators = computed(() => this.regulatorStore.dataList());
  regulatorsLoading = computed(() => this.regulatorStore.loading());

  readonly isCreateMode = computed(() => this.mode() === 'create');
  readonly isEditMode = computed(() => this.mode() === 'edit');
  readonly isViewMode = computed(() => this.mode() === 'view');

  readonly pageTitle = computed(() => {
    if (this.isEditMode()) {
      return 'process.edit.title';
    } else if (this.isViewMode()) {
      return 'process.view.title';
    } else {
      return 'process.create.title';
    }
  });

  readonly saveButtonLabel = computed(() => (this.isCreateMode() ? 'action.create' : 'action.update'));

  constructor() {
    // Reset stores when component initializes
    this.processStore.reset();

    this.initializeForm();
    this.setupEffects();
    this.determineMode();
    this.loadRegulators();
  }

  private initializeForm(): void {
    this.processForm = this.fb.group({
      id: [null],
      createdAt: [null],
      createdBy: [null],
      modifiedAt: [null],
      modifiedBy: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      regulatorId: [null, [Validators.required]],
    });
  }

  private setupEffects(): void {
    // Patch form when process data changes (for edit mode)
    effect(() => {
      const process = this.process();
      if (process) {
        this.processForm.patchValue({
          ...process,
          regulatorId: process.regulator?.id || null,
        });
      }
    });

    // Handle form state based on mode
    effect(() => {
      const isViewMode = this.isViewMode();
      if (this.processForm) {
        if (isViewMode) {
          this.processForm.disable();
        } else {
          this.processForm.enable();
        }
      }
    });
  }

  private determineMode(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const url = this.router.url;

      if (id) {
        this.processId.set(Number(id));
        this.processStore.findById({ id: Number(id) });

        if (url.includes('/view')) {
          this.mode.set('view');
        } else {
          this.mode.set('edit');
        }
      } else {
        this.mode.set('create');

        // Check for pre-selected regulator from query params
        this.route.queryParams.subscribe((queryParams) => {
          if (queryParams['regulatorId']) {
            this.processForm.patchValue({
              regulatorId: Number(queryParams['regulatorId']),
            });
          }
        });
      }
    });
  }

  private loadRegulators(): void {
    this.regulatorStore.getAll();
  }

  save(): void {
    if (this.processForm.valid) {
      const formValue = this.processForm.value;
      const selectedRegulator = this.regulators().find((r) => r.id === formValue.regulatorId);

      const process: ProcessDTO = {
        id: formValue.id,
        name: formValue.name?.trim(),
        description: formValue.description?.trim() || null,
        regulator: selectedRegulator || null,
        createdAt: formValue.createdAt,
        createdBy: formValue.createdBy,
        modifiedAt: formValue.modifiedAt,
        modifiedBy: formValue.modifiedBy,
      };

      this.processStore.save({ process });
      this.router.navigate(['/process']);
    }
  }

  cancel(): void {
    this.router.navigate(['/process']);
  }

  edit(): void {
    this.mode.set('edit');
  }

  // Form validation helpers
  hasFormControlError(controlName: string, errorType: string): boolean {
    const control = this.processForm.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

  getFormControlErrorMessage(controlName: string): string {
    const control = this.processForm.get(controlName);
    if (!control || !control.errors) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) {
      return `process.${controlName}.error.required`;
    }

    if (errors['maxlength']) {
      return `process.${controlName}.error.maxlength`;
    }

    return `process.${controlName}.error.invalid`;
  }
}
