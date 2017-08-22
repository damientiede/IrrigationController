import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule, HttpClient } from '@angular/http';
import {HttpClient, HttpEvent, HttpHandler, 
         HttpInterceptor, HttpRequest 
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { IrrigationControllerService} from './services/IrrigationController.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [IrrigationControllerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
