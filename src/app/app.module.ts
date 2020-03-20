import { MarchantDialogComponent } from './layouts/authorized/shared/marchant-dialog/marchant-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TokenService } from './service/token.service';
// import {SuiModule} from 'ng2-semantic-ui';
import { AgmCoreModule } from '@agm/core';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatSelectModule, MatAutocompleteModule, MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MarchantDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularSvgIconModule,
    // SuiModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAf0aX6Jgz6HbqvFIhI9BejpKdx3tVhjTk&libraries=places'
    }),
    DeviceDetectorModule.forRoot(),
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
    MatToolbarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [MarchantDialogComponent]
})
export class AppModule { }
