import { Routes } from '@angular/router';
import { AuthenticationGuard } from '@app/auth';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./regulator-list.component').then((m) => m.RegulatorListComponent),
  },
  {
    path: 'new',
    canActivate: [AuthenticationGuard],
    loadComponent: () => import('./edit/regulator.component').then((m) => m.RegulatorComponent),
  },
  {
    path: 'edit/:id',
    canActivate: [AuthenticationGuard],
    loadComponent: () => import('./edit/regulator.component').then((m) => m.RegulatorComponent),
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./view/regulator-view.component').then((m) => m.RegulatorViewComponent),
  },
];
