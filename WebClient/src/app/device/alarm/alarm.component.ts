import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";
import { IAlarm } from '../../model/alarm';
import { NavComponent } from '../../nav.component/nav.component';
import { IrrigationControllerService} from '../../services/IrrigationController.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {
  id= 0;
  title= 'New alarm';
  loaded = false;
  alarm: IAlarm;
  hardwareTypes: string[] = ['GPIO', 'Distributed', 'SPI'];
  constructor(private service: IrrigationControllerService,
              private route: ActivatedRoute,
              private nav: NavComponent,
              public toastr: ToastsManager) { }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      this.id = params['id'];
      if (Number.isNaN(this.id)) {
        alert('Missing alarm ID');
      }
      if (this.id > 0) {
        this.title = `Edit alarm - ${this.id}`;
        this.getAlarm(this.id);
      }
    });
  }
  getAlarm(id: number) {
    console.log('getAlarm()');
    this.service
      .getAlarm(id)
      .subscribe((a: IAlarm) => {
            console.log(a);
            this.alarm = a;
            this.loaded = true;
          },
          error => () => {
            console.log('Something went wrong...');
          },
          () => {
              console.log('Success');
          });
  }
  save() {
    console.log(this.alarm);
    this.service.saveAlarm(this.alarm)
      .subscribe(() => {},
      error => () => {
        console.log('Something went wrong...');
        this.toastr.error('Something went wrong...','Damn');
      },
      () => {
        console.log('Success');
        this.toastr.success('Changes saved' );
    });
  }
  back() {
    this.nav.Back();
  }
  cancel() {
    this.nav.Back();
  }
}
