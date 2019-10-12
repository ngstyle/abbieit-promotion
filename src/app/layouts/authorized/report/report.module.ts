import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatCardModule } from '@angular/material/card';
import { MarchantDialogComponent } from './../shared/marchant-dialog/marchant-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule, MatButtonModule, MatPaginatorModule, MatToolbarModule, MatTooltipModule, MatAutocompleteModule, MatInputModule, MatSelectModule } from '@angular/material';
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