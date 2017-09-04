import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './nav.component/nav.component';
import { HistoryComponent} from './history.component/history.component';
import { IrrigationControllerService} from './services/IrrigationController.service';

@NgModule({
    declarations: [
    AppComponent,
    NavComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    JsonpModule,
    RouterModule.forRoot([
      {      
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'home',
        component: AppComponent
      }
    ])
  ],
  providers: [IrrigationControllerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
