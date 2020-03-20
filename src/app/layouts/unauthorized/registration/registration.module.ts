import { RegistartionDialogComponent } from './registartionDialog/registartionDialog.component';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { Routes, RouterModule } from '@angular/router';
// import { MatButtonModule, MatFormFieldModule, 
//   MatInputModule, MatToolbarModule } from '@angular/material';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

const routes: Routes = [
  { path: '', component: RegistrationComponent }
];

const RegistrationRouter = RouterModule.forChild(routes);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegistrationRouter,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AgmCoreModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatToolbarModule,
    MatDatepickerModule
  ],
  declarations: [RegistrationComponent, RegistartionDialogComponent],
  entryComponents: [
    RegistartionDialogComponent
  ],
})

export class RegistrationModule { }