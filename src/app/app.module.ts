import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { FormsModule } from '@angular/forms';
import { SearchparamComponent } from './searchparam/searchparam.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    LandingComponent,
    SearchparamComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [LandingComponent]
})
export class AppModule { }
