import { AuthorizedComponent } from './authorized.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
        canActivate: []
      },
      {
        path: 'marchant',
        loadChildren: () => import('./merchant/merchant.module').then(mod => mod.MerchantModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(mod => mod.ReportModule)
      }
    ],
  },
];

export const AuthorizedRoutes = RouterModule.forChild(routes);