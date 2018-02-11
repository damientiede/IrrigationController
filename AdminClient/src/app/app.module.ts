import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
//import {ToasterModule, ToasterService} from 'angular2-toaster';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { FormsModule } from '@angular/forms';
//import { AuthGuard } from './common/auth.guard';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { StatusComponent } from './status.component/status.component';
//import { NavComponent } from './nav.component/nav.component';
//import { HistoryComponent} from './history.component/history.component';
//import { DiagnosticComponent } from './diagnostic.component/diagnostic.component';
//import { IrrigationControllerService} from './services/IrrigationController.service';
//import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    //StatusComponent,
    //NavComponent,
    //HistoryComponent,
    //DiagnosticComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule.forRoot(),
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [IrrigationControllerService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
