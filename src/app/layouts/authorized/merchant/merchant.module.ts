import { AutocompletefilterPipe } from './../../../pipe/autocompletefilter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantComponent } from './merchant.component';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule, MatSelectModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [
  { path: '', component: MerchantComponent }
];

const MarchantRouter = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    MarchantRouter,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatSelectModule
  ],
  declarations: [MerchantComponent, AutocompletefilterPipe]
})
export class MerchantModule { }
