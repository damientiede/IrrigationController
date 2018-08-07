import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params} from "@angular/router";
import {Observable} from 'rxjs/Rx';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NavService } from '../../services/nav.service';
import { IrrigationControllerService} from '../../services/IrrigationController.service';
import { IDevice } from '../../model/device';
import { ISchedule } from '../../model/schedule';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  @Input() Device: IDevice;

  loaded = true;
  ticks = 0;
  schedules: ISchedule[];
  constructor(private service: IrrigationControllerService,
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
      this.getSchedules(this.Device.id);
    }
    this.ticks = t;
  }
  getSchedules(id) {
    this.service.getSchedules(id)
    .subscribe((data: ISchedule[]) => {
        this.schedules = data;
        console.log(data);
    });
  }
  getStartDateTime(s) {
    if (s == null) { return; }
    const date = moment(s.StartDate).add(s.StartHours, 'h').add(s.StartMinutes, 'm');
    return moment(date).format('Do MMM YYYY h:mm:ss a');
  }
}
