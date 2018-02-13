import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from 'rxjs/Rx';
import * as moment from 'moment';
//import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
//import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IStatus} from '../model/status';
import { IDevice } from '../model/device';
import { ISolenoid } from '../model/solenoid';
import { IEvent } from '../model/event';
import { ICommand } from '../model/command';
import { IIrrigationProgram } from '../model/irrigationprogram';

@Component({
  selector: 'status-component',
  templateUrl: './status.component.html'
})

export class StatusComponent implements OnInit {  
  id = 1;
  ticks = 0;
  status: IStatus;
  device: IDevice;
  solenoids: ISolenoid[];
  activeProgram: IIrrigationProgram;
  manualStation: number = 1;
  manualDuration: number = 5;
  elapsed: number = 0;
  loaded: boolean = false;
  irrigating: boolean = false;

  dateFormat='YYYY-MM-DD HH:mm:ss';
  constructor (private dataService: IrrigationControllerService,
               public toastr: ToastsManager,
               vcr: ViewContainerRef,
               private router: Router
              ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getSolenoids(this.id);
    let timer = Observable.timer(0,5000);
    timer.subscribe(t => {
      this.onTick(t);
    });
  }
  onTick(t) {
    this.getData(this.id);
    this.ticks = t;
  }

  getData(id: number) {
    this.getDevice(id);
    this.getActiveProgram(id);
  }
  getDevice(id: number) {
    console.log('getDevice()');
    this.dataService
      .getDevice(id)
      .subscribe((d: IDevice) => {
            console.log(d);
            this.device = d;
            this.loaded = true;
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
  getSolenoids(id: number) {
    console.log('getSolenoids()');
    this.dataService
      .getSolenoids(id)
      .subscribe((s: ISolenoid[]) => {
            this.solenoids = s;
            //this.loaded = true;
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
  getActiveProgram(id: number) {
    console.log('getActiveProgram()');
    this.dataService
      .getActiveProgram(id)
      .subscribe((p: IIrrigationProgram) => {
            console.log(p);
            const now = moment();
            const start = moment(p.start);
            const fin = start.add(p.duration,'minutes');
            this.elapsed = now.diff(start) / (p.duration * 1000);
            if (moment().isBefore(fin)) {
              this.activeProgram = p;
              this.irrigating = true;
            }
           /*  if (moment(p.start).add(p.duration, 'minutes') > moment()){
              this.activeProgram = p;
              const e = moment().subtract()
              this.elapsed = ()
            } */
            //this.loaded = true;
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
    if (this.activeProgram != null) {
      return this.activeProgram.duration;
    }
    return 0;
  }
  getStatusClass(){
    /* if (this.status == null) return;
    if(this.status.state.indexOf("Irrigating") > -1) { return "panel panel-success"; }
    if(this.status.state.indexOf("Fault") > -1) { return "panel panel-danger"; } */
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
    if (this.activeProgram != null) {
      return moment(this.activeProgram.start).format("HH:mm");
    }
    return '';
  }
  getEnd() {
    if (this.activeProgram != null) {
      return moment(this.activeProgram.start).add(this.activeProgram.duration,'minutes').format("HH:mm");
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
    if (this.device != null) {
      return moment(this.device.updatedAt).format("Do MMM YYYY h:mm:ss a");
    }
    return '';    
  }
  manualStop() {
    let cmd = new ICommand(
      0,  //id
      'Stop',  //commandtype
      '', //params
      new Date, //issued
      null, //actioned
      1, //deviceId
      new Date, //createdAt
      null  //updatedAt
    );
    this.sendCommand(cmd);
  }
  manualStart() {
    if (this.manualStation != null && this.manualDuration != null) {
      let cmd = new ICommand(
        0,  //id
        'Manual',  //commandType
        `${this.manualStation}, ${this.manualDuration}`,
        new Date, //issued
        null, //actioned
        1, //deviceId
        new Date, //createdAt
        null  //updatedAt
      );
      this.sendCommand(cmd);
    }
  }
  sendCommand(cmd: ICommand) {
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
