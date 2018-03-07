import { Component, OnInit } from '@angular/core';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IDevice } from '../model/device';
import { NavComponent } from '../nav.component/nav.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id = 0;
  devices: IDevice[];
  loaded = false;
  constructor(private service: IrrigationControllerService,
              private nav: NavComponent) { }

  ngOnInit() {
    this.getDevices('username');
  }

  getDevices(username: string) {
    console.log('getDevice()');
    this.service
      .getDevices(username)
      .subscribe((d: IDevice[]) => {
        console.log(d);
        this.devices = d;
        this.loaded = true;
      },
      error => () => {
          console.log('Something went wrong...');
      },
      () => {
          console.log('Success');
      });
  }

  deviceClick(id: Number) {
    this.nav.NavTo(`device/${id}`);
  }

  getDeviceTitle() {

  }
}
