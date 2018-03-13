import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Params} from "@angular/router";
import { NavComponent } from '../nav.component/nav.component';
import * as moment from 'moment';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IDevice } from '../model/device';
import { IIrrigationProgram} from '../model/irrigationprogram';
import { IEvent } from '../model/event';
import { ICommand } from '../model/command';
import { isMoment } from 'moment';
import { ISolenoid } from '../model/solenoid';
import { IAlarm } from '../model/alarm';
import { IAnalog } from '../model/analog';
import { ISpi } from '../model/spi';

@Component({
  selector: 'config-component',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {
  deviceid=0;
  device: IDevice;
  irrigationPrograms: IIrrigationProgram[];
  solenoids: ISolenoid[];
  alarms: IAlarm[];
  analogs: IAnalog[];
  spis: ISpi[];
  loaded = false;
  selection= 'Device';
  views: ['Device', 'Solenoids', 'Alarms', 'Analogs', 'SPIs'];
  activeView = 'Device';
  showDevice: boolean = true;
  showSolenoids: boolean = false;
  showAlarms: boolean = false;

  constructor (private service: IrrigationControllerService,
               private route: ActivatedRoute,
               private nav: NavComponent ) {  }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      this.deviceid = params['deviceid'];
      if (Number.isNaN(this.deviceid)) {
        alert('Missing Device ID');
      }
      this.getDevice(this.deviceid);
    });
  }

  getDevice(id: number) {
    console.log('getDevice()');
    this.service
      .getDevice(id)
      .subscribe((d: IDevice) => {
            console.log(d);
            this.device = d;
            //this.getIrrigationPrograms();
            this.getSolenoids();
            this.getAlarms();
            this.getAnalogs();
            this.getSpis();
            this.loaded = true;
          },
          error => () => {
              console.log('Something went wrong...');
          },
          () => {
              console.log('Success');
          });
  }
  getIrrigationPrograms() {
      if (this.device != null) {
        this.service.getIrrigationPrograms(this.device.id)
        .subscribe((data: IIrrigationProgram[]) => {
            this.irrigationPrograms = data;
        });
      }
  }
  getSolenoids() {
    if (this.device != null) {
      this.service.getSolenoids(this.device.id)
      .subscribe((data: ISolenoid[]) => {
          this.solenoids = data;
          console.log(data);
      });
    }
  }
  getAlarms() {
    if (this.device != null) {
      this.service.getAlarms(this.device.id)
      .subscribe((data: IAlarm[]) => {
          this.alarms = data;
          console.log(data);
      });
    }
  }
  getAnalogs() {
    if (this.device != null) {
      this.service.getAnalogs(this.device.id)
      .subscribe((data: IAnalog[]) => {
          this.analogs = data;
          console.log(data);
      });
    }
  }
  getSpis() {
    if (this.device != null) {
      this.service.getSpis(this.device.id)
      .subscribe((data: ISpi[]) => {
          this.spis = data;
          console.log(data);
      });
    }
  }
  getLastUpdated() {
    if (this.device != null) {
      return moment(this.device.updatedAt).format('Do MMM YYYY h:mm:ss a');
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
    this.nav.NavTo(`/device/${this.device.id}/solenoid/${s.id}`);
  }
  editAlarm(a: IAlarm) {
    this.nav.NavTo(`/device/${this.device.id}/alarm/${a.id}`);
  }
  newSolenoid() {
    this.nav.NavTo(`/device/${this.device.id}/solenoid/new`);
  }
  newAlarm() {
    this.nav.NavTo(`/device/${this.device.id}/alarm/new`);
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
    return (this.activeView == v);
  }
}
