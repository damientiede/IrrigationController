import { Component, Input, OnInit, ViewContainerRef  } from '@angular/core';
import { Router, Params} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NavService } from '../../services/nav.service';
import { IDevice } from '../../model/device';
import { IrrigationControllerService} from '../../services/IrrigationController.service';
import { IEvent } from '../../model/event';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  @Input() Device: IDevice;

  deviceid = 0;
  ticks= 0;
  // device: IDevice;
  events: IEvent[] = [];
  loaded = false;
  eventTypes: string[] = [
    'Application', 'Fault', 'IO', 'Irrigation start', 'Irrigation stop'
  ];

  constructor (private dataService: IrrigationControllerService,
    public toastr: ToastsManager,
    private nav: NavService,
    vcr: ViewContainerRef,
    private router: Router) {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
      const timer = Observable.timer(0, 5000);
      timer
        .takeUntil(this.router.events)
        .subscribe(t => {
          this.onTick(t);
        });
  }
  onTick(t) {
    if (this.Device != null) {
      this.loaded = true;
      this.getEvents(this.Device.id);
    }
    this.ticks = t;
  }
  getEvents(id: number) {
    console.log('getEvents()');
    this.dataService
      .getEvents(id)
      .subscribe((data: IEvent[]) => {
            console.log(data.length);
            if (data.length > 0) {
              this.events = data;
              this.loaded = true;
            }
          },
          error => () => {
              console.log('Something went wrong...');
          },
          () => {
              // console.log('Success');
              // this._toasterService.pop('success', 'Complete', 'Getting all values complete');
              // this._slimLoadingBarService.complete();
          });
  }
  timeFormat(date) {
    return moment(date).format('h:mm:ss a');
  }

  getDeviceName() {
    if (this.Device != null) {
      return this.Device.Name;
    }
  }
  getEventType(et) {

  }
  backClick() {
    this.nav.Back();
  }
}
