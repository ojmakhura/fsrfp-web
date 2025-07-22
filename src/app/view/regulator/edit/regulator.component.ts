import { Component, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { RegulatorApiStore } from '@app/store/bw/co/roguesystems/fsrfp/regulator/regulator-api.store';
import { RegulatorDTO } from '@app/model/bw/co/roguesystems/fsrfp/regulator/regulator-dto';

import { QuillEditorComponent, QuillModule } from 'ngx-quill';

type ComponentMode = 'create' | 'edit' | 'view';

@Component({
  selector: 'app-regulator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule,
    QuillEditorComponent,
  ],
  templateUrl: './regulator.component.html',
  styleUrls: ['./regulator.component.scss'],
})
export class RegulatorComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private regulatorStore = inject(RegulatorApiStore);

  modules = {
    toolbar: [['bold', 'italic', 'underline'], ['code-block']],
  };

  // Signals from store
  readonly regulator = this.regulatorStore.data;
  readonly loading = this.regulatorStore.loading;
  // readonly saving = this.regulatorStore.saving;
  readonly error = this.regulatorStore.error;

  // Local state
  regulatorForm!: FormGroup;
  readonly currentMode = signal<ComponentMode>('create');

  // Computed properties
  readonly isCreateMode = computed(() => this.currentMode() === 'create');
  readonly isEditMode = computed(() => this.currentMode() === 'edit');
  readonly isViewMode = computed(() => this.currentMode() === 'view');

  readonly pageTitle = computed(() => {
    const mode = this.currentMode();
    switch (mode) {
      case 'create':
        return 'regulator.create.title';
      case 'edit':
        return 'regulator.edit.title';
      case 'view':
        return 'regulator.view.title';
      default:
        return 'regulator.title';
    }
  });

  readonly saveButtonLabel = computed(() => (this.isCreateMode() ? 'action.create' : 'action.update'));

  constructor() {
    // Reset store when component initializes
    this.regulatorStore.reset();

    this.initializeForm();
    this.setupEffects();
    this.determineMode();
  }

  private initializeForm(): void {
    this.regulatorForm = this.fb.group({
      id: [null],
      createdAt: [null],
      createdBy: [null],
      modifiedAt: [null],
      modifiedBy: [null],
      abbreviation: ['', [Validators.required, Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      website: ['', [Validators.maxLength(255)]],
      contactEmail: ['', [Validators.email, Validators.maxLength(100)]],
    });
  }

  private setupEffects(): void {
    // Patch form when regulator data changes (for edit mode)
    effect(() => {
      const regulator = this.regulator();
      console.log(regulator);
      if (regulator) {
        this.regulatorForm.patchValue(regulator);
      }
    });

    // Handle form state based on mode
    effect(() => {
      const isViewMode = this.isViewMode();
      if (this.regulatorForm) {
        if (isViewMode) {
          this.regulatorForm.disable();
        } else {
          this.regulatorForm.enable();
        }
      }
    });
  }

  private determineMode(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (id) {
        this.regulatorStore.findById({ id });
      }
    });
  }

  private loadRegulator(id: number): void {
    // this.regulatorStore.getById(id);
  }

  save(): void {
    if (this.regulatorForm.valid) {
      const formValue = this.regulatorForm.value;
      const regulator: RegulatorDTO = {
        id: formValue.id,
        abbreviation: formValue.abbreviation?.trim(),
        name: formValue.name?.trim(),
        description: formValue.description?.trim() || null,
        website: formValue.website?.trim() || null,
        contactEmail: formValue.contactEmail?.trim() || null,
        createdAt: formValue.createdAt,
        createdBy: formValue.createdBy,
        modifiedAt: formValue.modifiedAt,
        modifiedBy: formValue.modifiedBy,
      };

      if (this.isCreateMode()) {
        this.create(regulator);
      } else if (this.isEditMode()) {
        this.update(regulator);
      }
    }
  }

  private create(regulator: RegulatorDTO): void {
    // this.regulatorStore.create(regulator);
    // Navigate back on successful creation
    // You might want to implement a success effect here

    this.regulatorStore.save({
      regulator,
    });

    this.router.navigate(['/regulator']);
  }

  private update(regulator: RegulatorDTO): void {
    // this.regulatorStore.update(regulator);
    // Navigate back on successful update
    this.router.navigate(['/regulator']);
  }

  cancel(): void {
    this.router.navigate(['/regulator']);
  }

  edit(): void {
    if (this.isViewMode()) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.router.navigate(['/regulator', id, 'edit']);
      }
    }
  }

  // Form validation helpers
  hasFormControlError(controlName: string, errorType: string): boolean {
    const control = this.regulatorForm.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

  getFormControlErrorMessage(controlName: string): string {
    const control = this.regulatorForm.get(controlName);
    if (!control || !control.errors) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) {
      return `regulator.${controlName}.error.required`;
    }

    if (errors['maxlength']) {
      const maxLength = errors['maxlength'].requiredLength;
      return `regulator.${controlName}.error.maxlength`;
    }

    if (errors['email']) {
      return `regulator.${controlName}.error.email`;
    }

    return `regulator.${controlName}.error.invalid`;
  }
}
