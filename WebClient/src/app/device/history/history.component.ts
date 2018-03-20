import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IDevice } from '../../model/device';
import { IrrigationControllerService} from '../../services/IrrigationController.service';
import { IEvent } from '../../model/event';

@Component({
  selector: 'history-component',
  templateUrl: './history.component.html'
})

export class HistoryComponent implements OnInit { 
  deviceid = 0;
  device: IDevice;
  events: IEvent[] = [];
  loaded = false;
  eventTypes: string[] = [
    'Application', 'Fault','IO','Irrigation start','Irrigation stop'
  ];

  constructor (private dataService: IrrigationControllerService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      this.deviceid = params['deviceid'];
      if (Number.isNaN(this.deviceid)) {
        alert('Missing Device ID');
      }
      this.getEvents(this.deviceid);
    });
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
              console.log('Success');
              //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
              //this._slimLoadingBarService.complete();
          });
  }

  timeFormat(date) {
    return moment(date).format("h:mm:ss a");
  }

  getEventType(et) {

  }


}