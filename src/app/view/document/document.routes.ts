import { Routes } from '@angular/router';
import { DocumentListComponent } from './document-list.component';
import { DocumentEditComponent } from './edit/document-edit.component';
import { DocumentViewComponent } from './details/document-view.component';
import { AuthenticationGuard } from '@app/auth';

export const routes: Routes = [
  {
    path: '',
    component: DocumentListComponent,
    children: [],
  },
  {
    path: 'create',
    canActivate: [AuthenticationGuard],
    component: DocumentEditComponent,
  },
  {
    path: 'edit/:id',
    canActivate: [AuthenticationGuard],
    component: DocumentEditComponent,
  },
  {
    path: 'details/:id',
    component: DocumentViewComponent,
  },
];
