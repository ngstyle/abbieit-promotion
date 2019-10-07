import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ReportComponent }
];

const ReportRouter = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    ReportRouter
  ],
  declarations: [ReportComponent]
})

export class ReportModule { }