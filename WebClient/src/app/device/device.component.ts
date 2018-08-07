import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { ActivatedRoute, Router, Params} from '@angular/router';
import {Observable} from 'rxjs/Rx';
// import {untilComponentDestroyed} from 'ng2-rx-componentdestroyed;
import { IDevice } from '../model/device';
import { ISolenoid } from '../model/solenoid';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit, OnDestroy {
  deviceid: -1;
  device: IDevice;
  solenoids: ISolenoid[];
  loaded: boolean;
  view = 'status';
  ticks = 0;
  url: string;
  private sub: any;

  constructor(private service: IrrigationControllerService,
    public route: ActivatedRoute,
    private router: Router,
    private nav: NavService) { }

  ngOnInit() {
    console.log('DeviceComponent.OnInit');
    // this.url = this.route.snapshot.url.join('');
    this.route.params
      .subscribe((params: Params) => {
        console.log(params);
        this.deviceid = params['deviceid'];
        this.view = params['view'];
        if (Number.isNaN(this.deviceid)) {
          alert('Missing Device ID');
        }
        this.getSolenoids(this.deviceid);
        const timer = Observable.timer(0, 5000);
        timer.takeUntil(this.router.events)
             .subscribe(t => {
                this.onTick(t);
              });
      });
  }

  ngOnDestroy() {
    console.log('Unsubscribing timer');
    this.sub.unsubscribe();
  }

  onTick(t) {
    this.getDevice(this.deviceid);
    this.ticks = t;
  }

  getDevice(id: number) {
    console.log(`getDevice(): ${id}`);
    this.service
      .getDevice(id)
      .subscribe((d: IDevice) => {
            // console.log(d);
            this.device = d;
            this.loaded = true;
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
  getSolenoids(id: number) {
    console.log('getSolenoids() ' + id);
    this.service
      .getSolenoids(id)
      .subscribe((s: ISolenoid[]) => {
            this.solenoids = s;
            console.log(this.solenoids);
            // this.loaded = true;
          },
          error => () => {
              console.log('Something went wrong...');
              // this._toasterService.pop('error', 'Damn', 'Something went wrong...');
          },
          () => {
              // console.log('Success');
              // this._toasterService.pop('success', 'Complete', 'Getting all values complete');
              // this._slimLoadingBarService.complete();
          });
  }

  lastSeen() {
    if (this.device != null) {
      return this.device.updatedAt;
    }
    return null;
  }

  isView(v) {
    return (this.view === v);
  }
  // navigation
  config() {
    this.router.navigate([`/device/${this.device.id}/config`]);
  }
  history() {
    this.router.navigate([`/device/${this.device.id}/history`]);
  }
  schedules() {
    this.router.navigate([`/device/${this.device.id}/schedules`]);
  }
  status() {
    this.router.navigate([`/device/${this.device.id}/status`]);
  }
  getActiveClass(view) {
    if (this.isView(view)) {
      return 'btn-primary';
    }
    return 'btn-secondary';
  }
}
