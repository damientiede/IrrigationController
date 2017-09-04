import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import * as moment from 'moment';
//import { ToasterService } from 'angular2-toaster/angular2-toaster';
//import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { IrrigationControllerService} from './services/IrrigationController.service';
import { IStatus} from './model/status';
import { IEvent } from './model/event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {  
  status : IStatus;
  manualStation:number = 1;
  manualDuration:number = 5;
  elapsed:number = 0;
  loaded:boolean = false;
  constructor (private dataService:IrrigationControllerService,
               private router:Router
              ) { }

  ngOnInit() {
    this.getStatus();    
  }

  getStatus() {
    console.log('getStatus()');
    this.dataService
      .getStatus()
      .subscribe((data: IStatus[]) => {
            console.log(data.length);
            if (data.length > 0) {
              this.status = data[0];
              this.loaded = true;
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

  isLoaded() {
    return this.loaded;
  }
  getDuration() {
    if (this.status != null) {
      return this.status.duration;
    }
    return 0;
  }
  getStatusClass(){
    if(this.status.state.indexOf("Irrigating") > -1) { return "panel-success"; }
    if(this.status.state.indexOf("Fault") > -1) { return "panel-danger"; }
    return "panel-default";
  }
  formatDateShort(date) {
    return moment(date).format("dd/MM/yyyy");
  }  
  getState() {
    if (this.status != null) {
      return this.status.state;
    }
    return '';
  }
  getStartTime() {
    if (this.status != null) {
      return moment(this.status.start).format("HH:mm");
    }
    return '';
  }
  getEnd() {
    if (this.status != null) {
      return moment(this.status.start).add(this.status.duration,'minutes').format("HH:mm");
    }
    return '';
  }
  getPressure() {
    if (this.status != null) {
      return `${this.status.pressure} kPa`;
    }
    return '';
  }
  getLastUpdated() {
    if (this.status != null) {
      return moment(this.status.updatedAt).format("Do MMM YYYY h:mm:ss a");
    }
    return '';    
  }
  navToHistory() {
    this.router.navigate(['history']);
  }
}
