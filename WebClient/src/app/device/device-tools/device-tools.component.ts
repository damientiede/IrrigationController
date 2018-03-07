import { Component, OnInit, Input } from '@angular/core';
import { IrrigationControllerService} from '../../services/IrrigationController.service';
import { IDevice } from '../../model/device';
import { NavComponent } from '../../nav.component/nav.component';

@Component({
  selector: 'app-device-tools',
  templateUrl: './device-tools.component.html',
  styleUrls: ['./device-tools.component.css']
})
export class DeviceToolsComponent implements OnInit {
  @Input() device: IDevice;
  constructor(private service: IrrigationControllerService,
              private nav: NavComponent) { }
  ngOnInit() {
  }

  getDeviceTitle() {
    if (this.device == null) { return; }
    return `${this.device.Name} - ${this.device.Description}`;
  }
  settingsClick() {
    this.nav.NavTo(`/device/${this.device.id}/config`);
  }
}
