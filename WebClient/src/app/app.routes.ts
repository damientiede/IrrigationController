// Import our dependencies
import { Routes } from '@angular/router';
import { StatusComponent } from './status.component/status.component';
import { HistoryComponent } from './history.component/history.component';
import { ConfigComponent } from './config.component/config.component';
import { DiagnosticComponent } from './diagnostic.component/diagnostic.component';

//import { Login } from './login';
//import { Signup } from './signup';
import { AuthGuard } from './common/auth.guard';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: '', redirectTo:'status', pathMatch:'full'},
  //{ path: 'login',  component: Login },
  //{ path: 'signup', component: Signup },
  { path: 'status/:id',   component: StatusComponent, canActivate: [AuthGuard] },
  { path: 'history/:id',   component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'config/:id',   component: ConfigComponent, canActivate: [AuthGuard] },
  { path: 'diagnostic/:id',   component: DiagnosticComponent, canActivate: [AuthGuard] },
  { path: '**',     component: StatusComponent },
];
