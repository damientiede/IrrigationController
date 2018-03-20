// Import our dependencies
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeviceComponent } from './device/device.component';
import { StatusComponent } from './status.component/status.component';
import { HistoryComponent } from './device/history/history.component';
import { ConfigComponent } from './config.component/config.component';
import { DiagnosticComponent } from './diagnostic.component/diagnostic.component';
import { SolenoidComponent } from './device/solenoid/solenoid.component';
import { AlarmComponent } from './device/alarm/alarm.component';
import { AnalogComponent } from './device/analog/analog.component';
import { SpiComponent } from './device/spi/spi.component';
import { AuthGuard } from './common/auth.guard';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'device/:deviceid',   component: DeviceComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/history',   component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/config',   component: ConfigComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/config?view=:view',   component: ConfigComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/solenoid/:id', component: SolenoidComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/alarm/:id', component: AlarmComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/analog/:id', component: AnalogComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/spi/:id', component: SpiComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/diagnostic',   component: DiagnosticComponent, canActivate: [AuthGuard] },
  { path: '**',     component: HomeComponent },
];
