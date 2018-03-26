import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './common/auth.guard';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav.component/nav.component';
import { HistoryComponent} from './history/history.component';
import { IrrigationControllerService} from './services/IrrigationController.service';
import { routes } from './app.routes';
import { ConfigComponent } from './config/config.component';
import { SolenoidComponent } from './config/solenoid/solenoid.component';
import { AlarmComponent } from './config/alarm/alarm.component';
import { AnalogComponent } from './config/analog/analog.component';
import { SpiComponent } from './config/spi/spi.component';
import { StatusComponent } from './status/status.component';
import { DeviceToolsComponent } from './device-tools/device-tools.component';
import { SchedulesComponent } from './schedules/schedules.component';

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
    DeviceToolsComponent,
    SchedulesComponent
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
