import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlicerComponent } from './slicer/slicer.component'
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SlicerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
