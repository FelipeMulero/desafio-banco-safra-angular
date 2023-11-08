import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './view/login/login.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CallApiComponent } from './view/call-api/call-api.component';
import { QueryDataComponent } from './view/query-data/quey-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CallApiComponent,
    QueryDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
