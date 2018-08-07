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
import { HistoryComponent} from './device/history/history.component';
import { IrrigationControllerService} from './services/IrrigationController.service';
import { routes } from './app.routes';
import { ConfigComponent } from './device/config/config.component';
import { SolenoidComponent } from './device/config/solenoid/solenoid.component';
import { AlarmComponent } from './device/config/alarm/alarm.component';
import { AnalogComponent } from './device/config/analog/analog.component';
import { SpiComponent } from './device/config/spi/spi.component';
import { StatusComponent } from './device/status/status.component';
import { SchedulesComponent } from './device/schedules/schedules.component';
import { DevicesComponent } from './devices/devices.component';
import { StatusWidgetComponent } from './status-widget/status-widget.component';
import { DeviceComponent } from './device/device.component';
import { EditScheduleComponent } from './device/src/app/device/edit-schedule/edit-schedule.component';

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
    // DeviceToolsComponent,
    SchedulesComponent,
    DevicesComponent,
    StatusWidgetComponent,
    DeviceComponent,
    EditScheduleComponent
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
