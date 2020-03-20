import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponComponent } from './coupon.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxBarcodeModule } from 'ngx-barcode';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AngularSvgIconModule } from 'angular-svg-icon';

const routes: Routes = [
  { path: '', component: CouponComponent }
];

const CouponRouter = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    CouponRouter,
    NgxBarcodeModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    AngularSvgIconModule
  ],
  declarations: [CouponComponent]
})
export class CouponModule { }
