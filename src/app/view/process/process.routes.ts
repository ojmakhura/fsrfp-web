import { Routes } from '@angular/router';
import { ProcessListComponent } from './process-list.component';
import { ProcessComponent } from './edit/process.component';
import { ProcessViewComponent } from './view/process-view.component';
import { AuthenticationGuard } from '@app/auth';

export const routes: Routes = [
  {
    path: '',
    component: ProcessListComponent,
  },
  {
    path: 'create',
    canActivate: [AuthenticationGuard],
    component: ProcessComponent,
  },
  {
    path: 'edit/:id',
    canActivate: [AuthenticationGuard],
    component: ProcessComponent,
  },
  {
    path: 'details/:id',
    component: ProcessViewComponent,
  },
];
