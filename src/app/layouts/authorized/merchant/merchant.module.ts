import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantComponent } from './merchant.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: MerchantComponent }
];

const MarchantRouter = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    MarchantRouter
  ],
  declarations: [MerchantComponent]
})
export class MerchantModule { }
