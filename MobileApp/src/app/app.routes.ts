import {Routes} from '@angular/router';
import { StatusComponent } from './status/status.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { PageNotFoundComponent} from './not-found.component';

export const appRoutes: Routes = [
    {
        path: 'status',
        component: StatusComponent
        // canActivate:[LoggedInGuard]
    },
    {
        path: 'schedules',
        redirectTo: 'status'
        // component: SchedulesComponent
        // canActivate:[LoggedInGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'status'
    },
    {
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent
    }
];
