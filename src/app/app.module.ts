import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MockComponent } from './mock/mock.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LoadLazyModule} from 'ngx-load-lazy';

@NgModule({
  declarations: [
    AppComponent,
    MockComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    FormsModule,
    LoadLazyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
