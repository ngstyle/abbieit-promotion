import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponComponent } from './coupon.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxBarcodeModule } from 'ngx-barcode';

const routes: Routes = [
  { path: '', component: CouponComponent }
];

const CouponRouter = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    CouponRouter,
    NgxBarcodeModule
  ],
  declarations: [CouponComponent]
})
export class CouponModule { }
