import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './shared/auth.guard';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavService } from './services/nav.service';
import { HistoryComponent} from './history/history.component';
import { IrrigationControllerService} from './services/IrrigationController.service';
import { routes } from './app.routes';
import { ConfigComponent } from './config/config.component';
import { SolenoidComponent } from './solenoid/solenoid.component';
import { AlarmComponent } from './alarm/alarm.component';
import { AnalogComponent } from './analog/analog.component';
import { SpiComponent } from './spi/spi.component';
import { StatusComponent } from './status/status.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { DevicesComponent } from './devices/devices.component';
import { StatusWidgetComponent } from './status-widget/status-widget.component';
import { DeviceMenuComponent } from './device-menu/device-menu.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    HistoryComponent,
    ConfigComponent,
    SolenoidComponent,
    AlarmComponent,
    AnalogComponent,
    SpiComponent,
    SchedulesComponent,
    DevicesComponent,
    StatusWidgetComponent,
    DeviceMenuComponent,
    ScheduleComponent
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
  providers: [IrrigationControllerService, NavService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
