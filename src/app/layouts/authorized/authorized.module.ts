import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedComponent } from './authorized.component';
import { AuthorizedRoutes } from './authorized.routing';

@NgModule({
  imports: [
    CommonModule,
    AuthorizedRoutes
  ],
  declarations: [AuthorizedComponent]
})
export class AuthorizedModule { }