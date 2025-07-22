import { Component, computed, effect, inject, signal, OnInit, OnDestroy } from '@angular/core';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { Subject, takeUntil } from 'rxjs';

import { RegulatedOperationProcessApiStore } from '@app/store/bw/co/roguesystems/fsrfp/operation/process/regulated-operation-process-api.store';
import { RegulatedOperationApiStore } from '@app/store/bw/co/roguesystems/fsrfp/operation/regulated-operation-api.store';
import { ProcessApiStore } from '@app/store/bw/co/roguesystems/fsrfp/process/process-api.store';
import { RegulatedOperationProcessDTO } from '@app/model/bw/co/roguesystems/fsrfp/operation/process/regulated-operation-process-dto';

@Component({
  selector: 'app-regulated-operation-process-edit',
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
    MatCheckboxModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDividerModule,
    TranslateModule,
    QuillModule,
  ],
  templateUrl: './regulated-operation-process-edit.component.html',
  styleUrls: ['./regulated-operation-process-edit.component.scss'],
})
export class RegulatedOperationProcessEditComponent implements OnInit, OnDestroy {
  // Injected services
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);
  private regulatedOperationProcessStore = inject(RegulatedOperationProcessApiStore);
  private regulatedOperationStore = inject(RegulatedOperationApiStore);
  private processStore = inject(ProcessApiStore);

  // Signals
  regulatedOperationProcess = this.regulatedOperationProcessStore.data;
  regulatedOperations = this.regulatedOperationStore.dataList;
  regulatedOperationProcesses = this.regulatedOperationProcessStore.dataList;
  processes = this.processStore.dataList;
  loading = this.regulatedOperationProcessStore.loading;
  error = this.regulatedOperationProcessStore.error;

  // Form
  processForm: FormGroup;

  // Form value signals for reactive filtering
  selectedPreviousId = signal<string | null>(null);
  selectedNextId = signal<string | null>(null);
  selectedOperationId = signal<string | null>(null);

  // Destroy subject for cleanup
  private destroy$ = new Subject<void>();

  // Mode detection
  processId = signal<string | null>(null);
  isCreate = computed(() => this.processId() === null);

  // Page title
  pageTitle = computed(() => {
    return this.isCreate() ? 'regulated.operation.process.create.title' : 'regulated.operation.process.edit.title';
  });

  // Available processes (excludes processes already assigned to the current operation)
  availableProcesses = computed(() => {
    const allProcesses = this.processes();
    const currentOperationId = this.selectedOperationId();
    const allRegulatedOperationProcesses = this.regulatedOperationProcesses();
    const currentProcessId = this.processId();

    if (!allProcesses || !currentOperationId) return allProcesses || [];

    // Get all process IDs already assigned to this operation (excluding current process being edited)
    const assignedProcessIds = new Set(
      allRegulatedOperationProcesses
        ?.filter(rop =>
          rop.operationId === currentOperationId &&
          (!currentProcessId || rop.id !== currentProcessId) // Exclude current process when editing
        )
        ?.map(rop => rop.processId) || []
    );

    // Filter out already assigned processes
    return allProcesses.filter(process => !assignedProcessIds.has(process.id));
  });

  // Available previous processes (excludes current process and selected next process)
  availablePreviousProcesses = computed(() => {
    const allProcesses = this.regulatedOperationProcesses();
    const currentProcessId = this.processId();
    const selectedNextId = this.selectedNextId();

    if (!allProcesses) return [];

    return allProcesses.filter(p => {
      // Filter out the current process if editing
      if (currentProcessId && p.id === currentProcessId) {
        return false;
      }
      // Filter out the selected next process
      if (selectedNextId && p.id === selectedNextId) {
        return false;
      }
      return true;
    });
  });

  // Available next processes (excludes current process and selected previous process)
  availableNextProcesses = computed(() => {
    const allProcesses = this.regulatedOperationProcesses();
    const currentProcessId = this.processId();
    const selectedPreviousId = this.selectedPreviousId();

    if (!allProcesses) return [];

    return allProcesses.filter(p => {
      // Filter out the current process if editing
      if (currentProcessId && p.id === currentProcessId) {
        return false;
      }
      // Filter out the selected previous process
      if (selectedPreviousId && p.id === selectedPreviousId) {
        return false;
      }
      return true;
    });
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
    height: '150px',
  };

  constructor() {
    console.log('RegulatedOperationProcessEditComponent initialized');
    this.processForm = this.createForm();

    // Watch for form value changes to update reactive filters
    this.processForm.get('operationId')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.selectedOperationId.set(value || null);
    });

    this.processForm.get('previousId')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      // Value is now a RegulatedOperationProcessDTO object or null
      this.selectedPreviousId.set(value?.id || null);
    });

    this.processForm.get('nextId')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      // Value is now a RegulatedOperationProcessDTO object or null
      this.selectedNextId.set(value?.id || null);
    });

    // Watch for process data changes to populate form
    effect(() => {
      const processData = this.regulatedOperationProcess();
      const id = this.processId();
      if (processData && processData.id === id) {
        this.populateForm(processData);
      }
    });

    // Watch for save success
    // effect(() => {
    //   const success = this.regulatedOperationProcessStore.success();
    //   if (success) {
    //     this.showSuccessMessage(
    //       this.isCreate() ? 'regulatedOperationProcess.create.success' : 'regulatedOperationProcess.update.success',
    //     );
    //     // this.router.navigate(['/regulated-operation-processes']);
    //   }
    // });
  }

  ngOnInit(): void {
    this.loadRelatedData();
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.processId.set(id);
        this.loadProcess(id);
      }
    });

    // Check for operation ID in query params
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((queryParams) => {
      const operationId = queryParams['operationId'];
      if (operationId && this.isCreate()) {
        this.processForm.patchValue({ operationId });
        this.selectedOperationId.set(operationId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: [null], // For update operations
      createdAt: [null], // For update operations
      createdBy: [null], // For update operations
      modifiedAt: [null], // For update operations
      modifiedBy: [null], // For update operations
      description: [''],
      processId: ['', Validators.required],
      operationId: ['', Validators.required],
      initialProcess: [false],
      previousId: [''],
      nextId: [''],
    });
  }

  private populateForm(processData: RegulatedOperationProcessDTO): void {
    // Convert IDs to objects for the form if needed
    const allProcesses = this.regulatedOperationProcesses();
    const previousProcess = allProcesses?.find(p => p.id === processData.previousId);
    const nextProcess = allProcesses?.find(p => p.id === processData.nextId);

    this.processForm.patchValue({
      ...processData,
      previousId: previousProcess || null,
      nextId: nextProcess || null,
    });

    // Update selected value signals
    this.selectedOperationId.set(processData.operationId || null);
    this.selectedPreviousId.set(processData.previousId || null);
    this.selectedNextId.set(processData.nextId || null);
  }

  private loadProcess(id: string): void {
    this.regulatedOperationProcessStore.findById({ id });
  }

  private loadRelatedData(): void {
    this.regulatedOperationStore.getAll();
    this.processStore.getAll();
    this.regulatedOperationProcessStore.getAll();
  }

  canSave(): boolean {
    return this.processForm.valid && !this.loading() && this.isProcessSelectionValid();
  }

  private isProcessSelectionValid(): boolean {
    const formValue = this.processForm.value;
    const selectedProcessId = formValue.processId;
    const selectedOperationId = formValue.operationId;

    if (!selectedProcessId || !selectedOperationId) {
      return true; // Let other validators handle required fields
    }

    // Check if this process is already assigned to this operation
    const allRegulatedOperationProcesses = this.regulatedOperationProcesses();
    const currentProcessId = this.processId();

    const existingAssignment = allRegulatedOperationProcesses?.find(rop =>
      rop.operationId === selectedOperationId &&
      rop.processId === selectedProcessId &&
      (!currentProcessId || rop.id !== currentProcessId) // Exclude current process when editing
    );

    return !existingAssignment;
  }

  isDuplicateProcessSelection(): boolean {
    return !this.isProcessSelectionValid();
  }

  getProcessSelectionHelpText(): string {
    const selectedOperationId = this.selectedOperationId();
    const availableCount = this.availableProcesses().length;
    const totalCount = this.processes()?.length || 0;

    if (!selectedOperationId) {
      return 'regulated.operation.process.process.hint.selectOperation';
    }

    if (availableCount === 0) {
      return 'regulated.operation.process.process.hint.allAssigned';
    }

    if (availableCount < totalCount) {
      const assignedCount = totalCount - availableCount;
      return `regulated.operation.process.process.hint.someAssigned`;
    }

    return '';
  }

  compareRegulatedOperationProcesses(p1: RegulatedOperationProcessDTO, p2: RegulatedOperationProcessDTO): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }

  hasError(field: string, error: string): boolean {
    const control = this.processForm.get(field);
    return !!(control && control.hasError(error) && (control.dirty || control.touched));
  }

  save(): void {
    if (!this.canSave()) {
      return;
    }

    const formValue = this.processForm.value;
    const processData: RegulatedOperationProcessDTO = {
      ...formValue,
      id: this.processId(),
      // Convert objects back to IDs for saving
      previousId: formValue.previousId?.id || null,
      nextId: formValue.nextId?.id || null,
    };

    this.regulatedOperationProcessStore.save({ process: processData });
  }

  cancel(): void {
    this.router.navigate(['/regulated-operation-processes']);
  }

  back(): void {
    this.router.navigate(['/regulated-operation-processes']);
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
