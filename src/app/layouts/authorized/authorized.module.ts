import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedComponent } from './authorized.component';
import { AuthorizedRoutes } from './authorized.routing';
import { MenuBarComponent } from './shared/menu-bar/menu-bar.component';
// import { MatToolbarModule, MatButtonModule, MatDialogModule, MatInputModule, 
//          MatFormFieldModule, MatMenuModule, MatTableModule } from '@angular/material';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';



import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    AuthorizedRoutes,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    AngularSvgIconModule
  ],
  declarations: [AuthorizedComponent, MenuBarComponent]
})
export class AuthorizedModule { }