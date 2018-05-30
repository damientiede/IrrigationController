// Import our dependencies
import { Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { HistoryComponent } from './history/history.component';
import { ConfigComponent } from './config/config.component';
import { SolenoidComponent } from './config/solenoid/solenoid.component';
import { AlarmComponent } from './config/alarm/alarm.component';
import { AnalogComponent } from './config/analog/analog.component';
import { SpiComponent } from './config/spi/spi.component';
import { AuthGuard } from './common/auth.guard';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: '', redirectTo: 'device/1/status', pathMatch: 'full'},
  { path: 'device/:deviceid/status', component: StatusComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/schedules', component: SchedulesComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/config', component: ConfigComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/config?view=:view', component: ConfigComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/solenoid/:id', component: SolenoidComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/alarm/:id', component: AlarmComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/analog/:id', component: AnalogComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/spi/:id', component: SpiComponent, canActivate: [AuthGuard] },
  { path: '**',     component: StatusComponent },
];
