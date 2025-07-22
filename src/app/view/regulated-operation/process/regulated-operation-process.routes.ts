import { Routes } from '@angular/router';
import { RegulatedOperationProcessEditComponent } from './edit/regulated-operation-process-edit.component';
import { RegulatedOperationProcessListComponent } from './regulated-operation-process-list.component';
import { RegulatedOperationProcessViewComponent } from './view/regulated-operation-process-view.component';
import { AuthenticationGuard } from '@app/auth';

export const routes: Routes = [
  {
    path: '',
    component: RegulatedOperationProcessListComponent,
  },
  {
    path: 'create',
    canActivate: [AuthenticationGuard],
    component: RegulatedOperationProcessEditComponent,
  },
  {
    path: 'edit/:id',
    canActivate: [AuthenticationGuard],
    component: RegulatedOperationProcessEditComponent,
  },
  {
    path: 'view/:id',
    component: RegulatedOperationProcessViewComponent,
  },
];
