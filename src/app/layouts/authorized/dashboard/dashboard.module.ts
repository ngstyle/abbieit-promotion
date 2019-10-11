import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
const routes: Routes = [
  { path: '', component: DashboardComponent }
];

const DashboardRouter = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    DashboardRouter,
    NgCircleProgressModule.forRoot({
      backgroundPadding: 35,
      radius: 80,
      space: -2,
      outerStrokeWidth: 2,
      outerStrokeColor: "#808080",
      innerStrokeColor: "#e7e8ea",
      innerStrokeWidth: 2,
      subtitle: [
        ''
      ],
      titleFontSize: '25',
      titleColor : '#ff0000',
      titleFontWeight : '400',
      subtitleFontSize: '20',
      animateTitle: false,
      animationDuration: 1000,
      showUnits: false,
      clockwise: false
    }),
    MatCardModule,
    MatButtonModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
