import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputBase, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    MatButtonModule
  ],
  declarations: [RegistrationComponent]
})

export class RegistrationModule { }