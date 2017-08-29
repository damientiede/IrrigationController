import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HistoryComponent} from './history.component/history.component';
import { IrrigationControllerService} from './services/IrrigationController.service';
@NgModule({
  declarations: [
    AppComponent,
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
      }
    ])
  ],
  providers: [IrrigationControllerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
