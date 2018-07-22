import { Component, Input, OnInit, ViewContainerRef  } from '@angular/core';
import { Router, Params} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IrrigationControllerService} from '../../services/IrrigationController.service';
import { IStatus} from '../../model/status';
import { IDevice } from '../../model/device';
import { ISolenoid } from '../../model/solenoid';
import { IEvent } from '../../model/event';
import { ICommand } from '../../model/command';
import { IIrrigationProgram } from '../../model/irrigationprogram';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() Device: IDevice;
  @Input() Solenoids: ISolenoid[];

  // deviceid = -1;
  ticks = 0;
  status: IStatus;
  // device: IDevice;
  solenoids: ISolenoid[];
  activeProgram: IIrrigationProgram;
  manualStation = 1;
  manualDuration = 5;
  elapsed = 0;
  duration = 0;
  percentComplete = 0;
  loaded = false;
  irrigating = false;

  dateFormat= 'YYYY-MM-DD HH:mm:ss';
  constructor(private dataService: IrrigationControllerService,
    public toastr: ToastsManager,
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
      this.getData(this.Device.id);
    }
    this.ticks = t;
  }

  getData(id: number) {
    this.getActiveProgram(id);
  }

  getActiveProgram(id: number) {
    console.log(`getActiveProgram() ${id}`);
    this.dataService
      .getActiveProgram(id)
      .subscribe((p: IIrrigationProgram) => {
            // console.log(p);
            const finished = moment.utc(p.Finished);
            if (moment.utc().isAfter(finished)) {
              // this program is finished
              this.activeProgram = null;
              this.irrigating = false;
              return;
            }
            const now = moment.utc();
            const start = moment.utc(p.Start);
            const fin = moment.utc(p.Start);
            fin.add(p.Duration, 'minutes');
            this.elapsed = now.diff(start);
            this.duration = p.Duration * 60 * 1000;
            this.percentComplete = Math.ceil(this.elapsed / this.duration * 100);
            if (moment.utc().isBefore(fin)) {
              this.activeProgram = p;
              this.irrigating = true;
            }
          },
          error => () => {
              console.log('Something went wrong...');
          },
          () => {
              console.log('Success');
          });
  }
  /* getStatus() {
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
          },
          () => {
              console.log('Success');
          });
  } */
  getStatusText() {
    if (this.Device != null) {
      return this.Device.Status;
    }
  }
  isLoaded() {
    return this.loaded;
  }
  getDuration() {
    if (this.activeProgram != null) {
      return this.activeProgram.Duration;
    }
    return 0;
  }
  getStatusClass() {
    if (this.Device == null) { return 'alert alert-secondary'; }
    if (this.Device.State.indexOf('Irrigating') > -1) { return 'alert alert-success'; }
    if (this.Device.State.indexOf('Fault') > -1) { return 'alert alert-danger'; }
    return 'alert alert-secondary';
  }
  formatDateShort(date) {
    return moment(date).format('dd/MM/yyyy');
  }
  getState() {
    if (this.status != null) {
      return this.status.state;
    }
    return '';
  }
  getStartTime() {
    if (this.activeProgram != null) {
      return moment(this.activeProgram.Start).format('DD MMM YYYY HH:mm');
    }
    return '';
  }
  getEnd() {
    if (this.activeProgram != null) {
      return moment(this.activeProgram.Start).add(this.activeProgram.Duration, 'minutes').format('DD MMM YYYY HH:mm');
    }
    return '';
  }
  getDeviceTitle() {
    if (this.Device != null) {
      return this.Device.Name;
    }
  }
  getPressure() {
    if (this.Device != null) {
      return `${this.Device.Pressure} kPa`;
    }
    return '';
  }
  getLastUpdated() {
    if (this.Device != null) {
      return moment(this.Device.updatedAt).format('DD MMM YYYY HH:mm');
    }
    return '';
  }
  manualStop() {
    const cmd = new ICommand(
      0,  // id
      'Stop',  // commandtype
      '', // params
      new Date, // issued
      null, // actioned
      this.Device.id, // deviceId
      new Date, // createdAt
      null  // updatedAt
    );
    this.sendCommand(cmd);
  }
  manualStart() {
    if (this.manualStation != null && this.manualDuration != null) {
      const cmd = new ICommand(
         0,  // id
        'Manual',  // commandType
        `${this.manualStation}, ${this.manualDuration}`,
        new Date, // issued
        null, // actioned
        this.Device.id, // deviceId
        new Date, // createdAt
        null  // updatedAt
      );
      this.sendCommand(cmd);
    }
  }

  sendCommand(cmd: ICommand) {
    this.dataService.sendCommand(cmd)
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
}
