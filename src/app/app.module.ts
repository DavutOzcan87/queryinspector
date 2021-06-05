import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [LandingComponent]
})
export class AppModule { }
