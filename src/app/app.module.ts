import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TokenService } from './service/token.service';
import {SuiModule} from 'ng2-semantic-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularSvgIconModule,
    SuiModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
