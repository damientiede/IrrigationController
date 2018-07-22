// Import our dependencies
import { Routes } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { DevicesComponent } from './devices/devices.component';
import { StatusComponent } from './device/status/status.component';
import { SchedulesComponent } from './device/schedules/schedules.component';
import { HistoryComponent } from './device/history/history.component';
import { ConfigComponent } from './device/config/config.component';
import { SolenoidComponent } from './device/config/solenoid/solenoid.component';
import { AlarmComponent } from './device/config/alarm/alarm.component';
import { AnalogComponent } from './device/config/analog/analog.component';
import { SpiComponent } from './device/config/spi/spi.component';
import { AuthGuard } from './shared/auth.guard';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: '', redirectTo: 'devices', pathMatch: 'full'},
  { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid', component: DeviceComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/:view', component: DeviceComponent, canActivate: [AuthGuard] },
  /*
  canActivate, children: [
    { path: '*', component: StatusComponent, outlet: 'view' },
    { path: 'status/:deviceid', component: StatusComponent, outlet: 'view' },
    { path: 'schedules', component: SchedulesComponent, outlet: 'view'  },
    { path: 'history', component: HistoryComponent, outlet: 'view' },
    { path: 'config', component: ConfigComponent, outlet: 'view' }
  ] },
  */
  { path: 'device/:deviceid/solenoid/:id', component: SolenoidComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/alarm/:id', component: AlarmComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/analog/:id', component: AnalogComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/spi/:id', component: SpiComponent, canActivate: [AuthGuard] },
  { path: '**',     component: StatusComponent },
];
