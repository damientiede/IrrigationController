import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
//import { ToasterService } from 'angular2-toaster/angular2-toaster';
//import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IStatus} from '../model/status';
import { IEvent } from '../model/event';

@Component({
  selector: 'history-component',
  templateUrl: './history.component.html',
  //styleUrls: ['./app.component.css']
})

export class HistoryComponent implements OnInit {  
    ngOnInit() {
           
      }
}