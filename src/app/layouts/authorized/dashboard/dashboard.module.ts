import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

const DashboardRouter = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    DashboardRouter
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
