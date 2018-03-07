import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './common/auth.guard';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { StatusComponent } from './status.component/status.component';
import { NavComponent } from './nav.component/nav.component';
import { HistoryComponent} from './history.component/history.component';
import { DiagnosticComponent } from './diagnostic.component/diagnostic.component';
import { IrrigationControllerService} from './services/IrrigationController.service';
import { routes } from './app.routes';
import { ConfigComponent } from './config.component/config.component';
import { NewEditSolenoidComponent } from './newedit-solenoid/newedit-solenoid.component';
import { DeviceComponent } from './device/device.component';
import { SolenoidComponent } from './device/solenoid/solenoid.component';
import { AlarmComponent } from './device/alarm/alarm.component';
import { AnalogComponent } from './device/analog/analog.component';
import { SpiComponent } from './device/spi/spi.component';
import { DeviceToolsComponent } from './device/device-tools/device-tools.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatusComponent,
    HistoryComponent,
    DiagnosticComponent,
    ConfigComponent,
    NewEditSolenoidComponent,
    DeviceComponent,
    SolenoidComponent,
    AlarmComponent,
    AnalogComponent,
    SpiComponent,
    DeviceToolsComponent
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
  providers: [IrrigationControllerService, NavComponent, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
