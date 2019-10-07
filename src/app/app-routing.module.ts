import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from './service/authguard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/authorized/authorized.module').then(mod => mod.AuthorizedModule),
    canActivate: [AuthguardService]
  },
  {
    path: 'signin',
    loadChildren: () => import('./layouts/unauthorized/signin/signin.module').then(mod => mod.SigninModule),
  },
  {
    path: 'registration',
    loadChildren: () => import('./layouts/unauthorized/registration/registration.module').then(mod => mod.RegistrationModule),
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
