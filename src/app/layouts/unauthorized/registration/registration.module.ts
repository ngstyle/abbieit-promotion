import { RegistartionDialogComponent } from './registartionDialog/registartionDialog.component';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
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
    MatToolbarModule
  ],
  declarations: [RegistrationComponent, RegistartionDialogComponent],
  entryComponents: [
    RegistartionDialogComponent
  ],
})

export class RegistrationModule { }