import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlicerComponent } from './slicer/slicer.component'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SlicerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
