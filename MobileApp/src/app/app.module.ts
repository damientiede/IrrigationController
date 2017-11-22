import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StatusComponent } from './status/status.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { PageNotFoundComponent } from './not-found.component';
import { appRoutes } from './app.routes';
import { NavService } from './nav.service';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    SchedulesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    // other imports here

  ],
  providers: [
    NavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
