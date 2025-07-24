import { Component, computed, effect, inject, signal, OnInit } from '@angular/core';
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
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';

import { RegulatedOperationApiStore } from '@app/store/bw/co/roguesystems/fsrfp/operation/regulated-operation-api.store';
import { RegulatorApiStore } from '@app/store/bw/co/roguesystems/fsrfp/regulator/regulator-api.store';
import { RegulatedOperationDTO } from '@app/model/bw/co/roguesystems/fsrfp/operation/regulated-operation-dto';
import { RegulatorDTO } from '@app/model/bw/co/roguesystems/fsrfp/regulator/regulator-dto';

@Component({
  selector: 'app-regulated-operation-edit',
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
    MatDividerModule,
    TranslateModule,
    QuillModule,
  ],
  templateUrl: './regulated-operation-edit.component.html',
  styleUrls: ['./regulated-operation-edit.component.scss'],
})
export class RegulatedOperationEditComponent implements OnInit {
  // Injected services
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);
  private regulatedOperationStore = inject(RegulatedOperationApiStore);
  private regulatorStore = inject(RegulatorApiStore);

  // Signals
  regulatedOperation = this.regulatedOperationStore.data;
  regulators = this.regulatorStore.dataList;
  loading = this.regulatedOperationStore.loading;
  error = this.regulatedOperationStore.error;

  // Form
  regulatedOperationForm: FormGroup;

  // Mode detection
  regulatedOperationId = signal<string | null>(null);
  isCreate = computed(() => this.regulatedOperationId() === null);

  // Page title
  pageTitle = computed(() => {
    return this.isCreate() ? 'regulated.operation.create.title' : 'regulatedOperation.edit.title';
  });

  // Quill editor configuration
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image'],
    ],
  };

  quillStyles = {
    height: '400px',
  };

  constructor() {
    console.log('RegulatedOperationEditComponent initialized');
    this.regulatedOperationForm = this.createForm();

    // Watch for regulated operation data changes to populate form
    effect(() => {
      const operation = this.regulatedOperation();
      const id = this.regulatedOperationId();
      if (operation && operation.id === id) {
        this.populateForm(operation);
      }
    });

    // Watch for save success
    // effect(() => {
    //   const success = this.regulatedOperationStore.success();
    //   if (success) {
    //     this.showSuccessMessage(
    //       this.isCreate() ? 'regulated.operation.create.success' : 'regulatedOperation.update.success',
    //     );
    //     this.router.navigate(['/regulated-operations']);
    //   }
    // });
  }

  ngOnInit(): void {
    this.loadRegulators();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.regulatedOperationId.set(id);
        this.loadRegulatedOperation(id);
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      regulator: ['', Validators.required],
      id: [null], // For update operations
      createdAt: [null], // For update operations
      createdBy: [null], // For update operations
      modifiedAt: [null], // For update operations
      modifiedBy: [null], // For update operations
    });
  }

  private populateForm(operation: RegulatedOperationDTO): void {
    this.regulatedOperationForm.patchValue(operation);
    console.log(this.regulatedOperationForm);
  }

  private loadRegulatedOperation(id: string): void {
    this.regulatedOperationStore.findById({ id });
  }

  private loadRegulators(): void {
    this.regulatorStore.getAll();
  }

  canSave(): boolean {
    return this.regulatedOperationForm.valid && !this.loading();
  }

  compareRegulators(reg1: RegulatorDTO, reg2: RegulatorDTO): boolean {
    return reg1 && reg2 ? reg1.id === reg2.id : reg1 === reg2;
  }

  hasError(field: string, error: string): boolean {
    const control = this.regulatedOperationForm.get(field);
    return !!(control && control.hasError(error) && (control.dirty || control.touched));
  }

  save(): void {
    if (!this.canSave()) {
      return;
    }

    const formValue = this.regulatedOperationForm.value;
    console.log(formValue);
    const operationData: RegulatedOperationDTO = {
      ...formValue,
      id: this.regulatedOperationId(),
    };

    this.regulatedOperationStore.save(operationData);
  }

  cancel(): void {
    this.router.navigate(['/regulated-operations']);
  }

  back(): void {
    this.router.navigate(['/regulated-operations']);
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
