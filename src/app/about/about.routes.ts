import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';

export const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: { title: 'About' },
  },
];
