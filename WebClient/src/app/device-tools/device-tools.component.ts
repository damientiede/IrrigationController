import { Component, OnInit, Input } from '@angular/core';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { ActivatedRoute, Params} from "@angular/router";
import { IDevice } from '../model/device';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-device-tools',
  templateUrl: './device-tools.component.html',
  styleUrls: ['./device-tools.component.css']
})
export class DeviceToolsComponent implements OnInit {
  @Input() device: IDevice;
  url: string;
  constructor(private service: IrrigationControllerService,
              public route: ActivatedRoute,
              private nav: NavService) { }
  ngOnInit() {
    this.url = this.route.snapshot.url.join('');
  }
  settings() {
    this.nav.NavTo(`/device/${this.device.id}/config`);
  }
  history() {
    this.nav.NavTo(`/device/${this.device.id}/history`);
  }
  schedules() {
    this.nav.NavTo(`/device/${this.device.id}/schedules`);
  }
  status() {
    this.nav.NavTo(`/device/${this.device.id}/status`);
  }
  getActiveClass(view) {
    if (this.url.indexOf(view) > 0) {
      return 'btn-primary';
    } else {
      return 'btn-secondary';
    }
  }
  lastSeen() {
    if (this.device != null) {
      return this.device.updatedAt;
    }
    return null;
  }
}
