import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './common/auth.guard';
import { AppComponent } from './app.component';
import { StatusComponent } from './status.component/status.component';
import { NavComponent } from './nav.component/nav.component';
import { HistoryComponent} from './history.component/history.component';
import { IrrigationControllerService} from './services/IrrigationController.service';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    NavComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    JsonpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [IrrigationControllerService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
