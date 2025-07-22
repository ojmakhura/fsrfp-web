import { Routes } from '@angular/router';
import { DocumentTypeComponent } from './document-type.component';
import { DocumentTypeListComponent } from './document-type-list.component';

export const routes: Routes = [
  {
    path: '',
    component: DocumentTypeListComponent,
  },
  {
    path: 'edit',
    component: DocumentTypeComponent,
  },
  {
    path: 'edit/:id',
    component: DocumentTypeComponent,
  },
];
