import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import {Router} from "@angular/router";
import * as moment from 'moment';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IDevice } from '../model/device';
import { IIrrigationProgram} from '../model/irrigationprogram';
import { IEvent } from '../model/event';
import { ICommand } from '../model/command';
import { isMoment } from 'moment';

@Component({
  selector: 'diagnostic-component',
  templateUrl: './diagnostic.component.html'
})

export class DiagnosticComponent implements OnInit {
  device: IDevice;
  irrigationPrograms: IIrrigationProgram[];
  loaded = false;
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

  getLastUpdated() {
    if (this.device != null) {
      return moment(this.device.updatedAt).format("Do MMM YYYY h:mm:ss a");
    }
    return '';
  }

  timeFormat(date) {
    return moment(date).format("h:mm:ss a");
  }
  dateTimeFormat(date) {
      if (moment(date).isValid()) {
        return moment(date).format("Do MMM YYYY h:mm:ss a");
      }
      return '';
  }
}
