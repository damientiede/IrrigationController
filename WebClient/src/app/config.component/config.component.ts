import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IDevice } from '../model/device';
import { IIrrigationProgram} from '../model/irrigationprogram';
import { IEvent } from '../model/event';
import { ICommand } from '../model/command';
import { isMoment } from 'moment';
import { ISolenoid } from '../model/solenoid';

@Component({
  selector: 'config-component',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {
  device: IDevice;
  irrigationPrograms: IIrrigationProgram[];
  solenoids: ISolenoid[];
  loaded = false;

  // solenoid new/edit
  editSolenoid: ISolenoid;

  constructor (private service: IrrigationControllerService,
               private router: Router
              ) {  }

  ngOnInit() {
    this.getDevice(3);
  }

  getDevice(id: number) {
    console.log('getDevice()');
    this.service
      .getDevice(id)
      .subscribe((d: IDevice) => {
            console.log(d);
            this.device = d;
            this.getIrrigationPrograms();
            this.getSolenoids();
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

  editSolenoidClick(s: ISolenoid) {
    this.editSolenoid = s;
  }


}
