import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";
import { NavService } from '../services/nav.service';
import * as moment from 'moment';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IDevice } from '../model/device';
import { ISchedule } from '../model/schedule';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  loaded = true;
  deviceid= 0;
  device: IDevice;
  schedules: ISchedule[];
  constructor (private service: IrrigationControllerService,
    private route: ActivatedRoute,
    private nav: NavService ) {  }

  ngOnInit() {
  // extract route params
  this.route.params.subscribe((params: Params) => {
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
            this.getSchedules();
            this.loaded = true;
          },
          error => () => {
              console.log('Something went wrong...');
          },
          () => {
              console.log('Success');
          });
  }
  getSchedules() {
    if (this.device != null) {
      this.service.getSchedules(this.device.id)
      .subscribe((data: ISchedule[]) => {
          this.schedules = data;
          console.log(data);
      });
    }
  }
}
