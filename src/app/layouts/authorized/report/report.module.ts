import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatCardModule } from '@angular/material/card';
import { MarchantDialogComponent } from './../shared/marchant-dialog/marchant-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { Routes, RouterModule } from '@angular/router';
// import { MatTableModule, MatButtonModule, MatPaginatorModule, 
//   MatToolbarModule, MatTooltipModule, MatAutocompleteModule, 
//   MatInputModule, MatSelectModule } from '@angular/material';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ReportComponent }
];

const ReportRouter = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    ReportRouter,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatToolbarModule,
    AngularSvgIconModule,
    MatTooltipModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
  ],
  declarations: [ReportComponent],
  entryComponents: []
})

export class ReportModule { }