import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
//import { ToasterService } from 'angular2-toaster/angular2-toaster';
//import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IIrrigationProgram} from '../model/irrigationprogram';
import { IEvent } from '../model/event';

@Component({
  selector: 'history-component',
  templateUrl: './history.component.html'
})

export class HistoryComponent implements OnInit { 
  events: IEvent[] = [];
  eventTypes: string[] = [
    'Application', 'Fault','IO','Irrigation start','Irrigation stop'
  ];
  
  constructor (private dataService:IrrigationControllerService
   ) { }

  ngOnInit() {
    this.getEvents(); 
  }

  getEvents() {
    console.log('getStatus()');
    this.dataService
      .getEvents()
      .subscribe((data: IEvent[]) => {
            console.log(data.length);
            if (data.length > 0) {
              this.events = data;
              //this.loaded = true;
            }            
          },
          error => () => {
              console.log('Something went wrong...');
              //this._toasterService.pop('error', 'Damn', 'Something went wrong...');
          },
          () => {
              console.log('Success');
              //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
              //this._slimLoadingBarService.complete();
          });     
  }

  timeFormat(date) {
    return moment(date).format("h:mm:ss a");
  }

  getEventType(et) {

  }


}