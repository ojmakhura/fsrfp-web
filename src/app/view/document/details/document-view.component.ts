import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { DocumentApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/document-api.store';
import { DocumentTypeApiStore } from '@app/store/bw/co/roguesystems/fsrfp/document/type/document-type-api.store';
import { DocumentDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/document-dto';
import { DocumentApi } from '@app/service/bw/co/roguesystems/fsrfp/document/document-api';
import { EntityType } from '@app/model/bw/co/roguesystems/fsrfp/entity-type';

@Component({
  selector: 'app-document-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentViewComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private documentStore = inject(DocumentApiStore);
  private documentTypeStore = inject(DocumentTypeApiStore);
  private documentApi = inject(DocumentApi);
  private snackBar = inject(MatSnackBar);

  // Signals
  document = this.documentStore.data;
  documentTypes = this.documentTypeStore.dataList;
  loading = this.documentStore.loading;
  error = this.documentStore.error;

  // Document ID
  documentId = signal<string | null>(null);

  // Page title
  pageTitle = computed(() => 'document.view.title');

  constructor() {
    // Watch for document data changes
    effect(() => {
      const doc = this.document();
      const id = this.documentId();
      if (doc && doc.id === id) {
        // Document loaded successfully
      }
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.documentId.set(id);
      this.documentStore.findById({ id });
    }
  }

  getDocumentTypeName(documentTypeId: string | undefined): string {
    if (!documentTypeId) return '';
    const docType = this.documentTypes().find((dt: any) => dt.id === documentTypeId);
    return docType?.name || documentTypeId;
  }

  downloadDocument(): void {
    const doc = this.document();
    if (!doc || !doc.id) return;

    this.documentApi.downloadFile(doc.id).subscribe({
      next: (blob: any) => {
        const url = window.URL.createObjectURL(blob);
        const link = window.document.createElement('a');
        link.href = url;
        link.download = doc.filename || 'document';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error: any) => {
        console.error('Download failed:', error);
        this.snackBar.open('document.download.error', 'Close', { duration: 3000 });
      },
    });
  }

  deleteDocument(): void {
    const doc = this.document();
    if (!doc || !doc.id) return;

    const confirmed = confirm('Are you sure you want to delete this document?');
    if (confirmed) {
      this.documentStore.remove({ id: doc.id });

      // Watch for delete success
      effect(() => {
        const success = this.documentStore.success();
        if (success) {
          this.snackBar.open('document.delete.success', 'Close', { duration: 3000 });
          this.router.navigate(['/documents']);
        }
      });
    }
  }

  back(): void {
    this.router.navigate(['/documents']);
  }

  edit(): void {
    const id = this.document().id;
    if (id) {
      console.log('Navigating to edit document:', id);
      this.router.navigate(['/documents/edit', id]);
    }
  }

  getTargetDisplay(target: EntityType | undefined): string {
    if (!target) return '';
    return target.toString();
  }
}
