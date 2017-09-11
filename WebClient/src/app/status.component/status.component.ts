import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import {Router} from "@angular/router";
import * as moment from 'moment';
//import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
//import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IStatus} from '../model/status';
import { IEvent } from '../model/event';
import { ICommand } from '../model/command';

@Component({
  selector: 'status-component',
  templateUrl: './status.component.html'
})

export class StatusComponent implements OnInit {  
  status : IStatus;
  manualStation:number = 1;
  manualDuration:number = 5;
  elapsed:number = 0;
  loaded:boolean = false;
  constructor (private dataService:IrrigationControllerService,
               public toastr: ToastsManager, 
               vcr: ViewContainerRef,      
               private router:Router
              ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

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
    if (this.status == null) return;
    if(this.status.state.indexOf("Irrigating") > -1) { return "panel panel-success"; }
    if(this.status.state.indexOf("Fault") > -1) { return "panel panel-danger"; }
    return "panel panel-default";
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
  manualStop() {
    let cmd = new ICommand(
      0,  //id
      4,  //commandtype
      '', //params
      new Date, //issued
      null, //actioned
      new Date, //createdAt
      null  //updatedAt
    );
    this.sendCommand(cmd);
  }
  manualStart() {
    if (this.manualStation != null && this.manualDuration != null) {
      let cmd = new ICommand(
        0,  //id
        3,  //commandtype
        `${this.manualStation}, ${this.manualDuration}`,
        new Date, //issued
        null, //actioned
        new Date, //createdAt
        null  //updatedAt
      );
      this.sendCommand(cmd);
    }
  }
  sendCommand(cmd:ICommand) {
    this.dataService.sendCommand(cmd)
    .subscribe(() => {},
      error => () => {
        console.log('Something went wrong...');
        this.toastr.error('Something went wrong...','Damn');
      },
      () => {
        console.log('Success');
        this.toastr.success('It will take a few moments to process.','Command sent' );
        //this._slimLoadingBarService.complete();
    });           
  }
}
