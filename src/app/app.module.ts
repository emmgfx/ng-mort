import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdDatepickerModule, MdToolbarModule, MdIconModule,
  MdButtonModule, MdCardModule, MdInputModule,
  MdNativeDateModule, MdSlideToggleModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MdDatepickerModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdNativeDateModule,
    MdSlideToggleModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
