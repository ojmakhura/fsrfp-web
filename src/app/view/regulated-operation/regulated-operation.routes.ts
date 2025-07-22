import { Routes } from '@angular/router';
import { RegulatedOperationListComponent } from './regulated-operation-list.component';
import { RegulatedOperationEditComponent } from './edit/regulated-operation-edit.component';
import { RegulatedOperationViewComponent } from './view/regulated-operation-view.component';
import { AuthenticationGuard } from '@app/auth';

export const routes: Routes = [
  {
    path: '',
    component: RegulatedOperationListComponent,
  },
  {
    path: 'create',
    canActivate: [AuthenticationGuard],
    component: RegulatedOperationEditComponent,
  },
  {
    path: 'edit/:id',
    canActivate: [AuthenticationGuard],
    component: RegulatedOperationEditComponent,
  },
  {
    path: 'view/:id',
    component: RegulatedOperationViewComponent,
  },
];
