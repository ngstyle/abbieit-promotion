import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import('./layouts/unauthorized/signin/signin.module').then(mod => mod.SigninModule),
  },
  {
    path: '',
    loadChildren: () => import('./layouts/authorized/authorized.module').then(mod => mod.AuthorizedModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
