import { Component, Input, OnInit, ViewContainerRef  } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, Params} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { NavService } from '../../services/nav.service';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IrrigationControllerService} from '../../services/IrrigationController.service';
import { IDevice } from '../../model/device';
import { IIrrigationProgram} from '../../model/irrigationprogram';
import { IEvent } from '../../model/event';
import { ICommand } from '../../model/command';
import { isMoment } from 'moment';
import { ISolenoid } from '../../model/solenoid';
import { IAlarm } from '../../model/alarm';
import { IAnalog } from '../../model/analog';
import { ISpi } from '../../model/spi';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {
  @Input() Device: IDevice;

  ticks= 0;
  irrigationPrograms: IIrrigationProgram[];
  solenoids: ISolenoid[];
  alarms: IAlarm[];
  analogs: IAnalog[];
  spis: ISpi[];
  loaded = true;
  selection= 'Device';
  views: ['Device', 'Solenoids', 'Alarms', 'Analogs', 'SPIs'];
  activeView = 'Device';
  showDevice = true;
  showSolenoids = false;
  showAlarms = false;

  constructor (private service: IrrigationControllerService,
               private router: Router,
               public toastr: ToastsManager,
               vcr: ViewContainerRef,
               private nav: NavService ) {
                this.toastr.setRootViewContainerRef(vcr);
                }

  ngOnInit() {
    const timer = Observable.timer(0, 15000);
    timer
      .takeUntil(this.router.events)
      .subscribe(t => {
        this.onTick(t);
      });
  }
  onTick(t) {
    if (this.Device != null) {
      this.loaded = true;
      this.getData(this.Device.id);
    }
    this.ticks = t;
  }
  getData(id) {
    this.getSolenoids(id);
    this.getAlarms(id);
    this.getAnalogs(id);
    this.getSpis(id);
  }
  getSolenoids(id) {
    this.service.getSolenoids(id)
    .subscribe((data: ISolenoid[]) => {
        this.solenoids = data;
        console.log(data);
    });
  }
  getAlarms(id) {
    this.service.getAlarms(id)
    .subscribe((data: IAlarm[]) => {
        this.alarms = data;
        console.log(data);
    });
  }
  getAnalogs(id) {
    this.service.getAnalogs(id)
    .subscribe((data: IAnalog[]) => {
        this.analogs = data;
        console.log(data);
    });
  }
  getSpis(id) {
    this.service.getSpis(id)
    .subscribe((data: ISpi[]) => {
        this.spis = data;
        console.log(data);
    });
  }
  getLastUpdated() {
    if (this.Device != null) {
      return moment(this.Device.updatedAt).format('Do MMM YYYY h:mm:ss a');
    }
    return '';
  }

  timeFormat(date) {
    return moment(date).format('h:mm:ss a');
  }
  dateTimeFormat(date) {
      if (moment(date).isValid()) {
        return moment(date).format('Do MMM YYYY h:mm:ss a');
      }
      return '';
  }

  editSolenoid(s: ISolenoid) {
    this.nav.NavTo(`/device/${this.Device.id}/solenoid/${s.id}`);
  }
  editAlarm(a: IAlarm) {
    this.nav.NavTo(`/device/${this.Device.id}/alarm/${a.id}`);
  }
  editAnalog(a: IAnalog) {
    this.nav.NavTo(`/device/${this.Device.id}/analog/${a.id}`);
  }
  editSPI(s: ISpi) {
    this.nav.NavTo(`/device/${this.Device.id}/spi/${s.id}`);
  }
  newSolenoid() {
    this.nav.NavTo(`/device/${this.Device.id}/solenoid/new`);
  }
  newAlarm() {
    this.nav.NavTo(`/device/${this.Device.id}/alarm/new`);
  }
  newAnalog() {
    this.nav.NavTo(`/device/${this.Device.id}/analog/new`);
  }
  newSPI() {
    this.nav.NavTo(`/device/${this.Device.id}/spi/new`);
  }
  deviceClicked() {
    this.activeView = 'Device';
    this.showDevice = true;
    this.showSolenoids = false;
    this.showAlarms = false;
  }
  solenoidsClicked() {
    this.activeView = 'Solenoids';
    this.showDevice = false;
    this.showSolenoids = true;
    this.showAlarms = false;
  }
  alarmsClicked() {
    this.activeView = 'Alarms';
  }
  analogsClicked() {
    this.activeView = 'Analogs';
  }
  spisClicked() {
    this.activeView = 'SPIs';
  }
  getActiveClass(v) {
    if (this.activeView === v) {
      return 'active';
    }
    return;
  }
  isView(v) {
    return (this.activeView === v);
  }

  getDeviceName() {
    if (this.Device != null) {
      return this.Device.Name;
    }
  }
  backClick() {
    this.nav.Back();
  }
  sendCommand(cmd: ICommand) {
    this.service.sendCommand(cmd)
    .subscribe(() => {},
      error => () => {
        console.log('Something went wrong...');
        this.toastr.error('Something went wrong...', 'Damn');
      },
      () => {
        console.log('Success');
        this.toastr.success('Command sent' );
    });
  }
  refreshConfig() {
    const cmd = new ICommand(
      0,  // id
     'LoadConfig',  // commandType
     '', // params
     new Date, // issued
     null, // actioned
     this.Device.id, // deviceId
     new Date, // createdAt
     null  // updatedAt
   );
   this.sendCommand(cmd);
  }
}
