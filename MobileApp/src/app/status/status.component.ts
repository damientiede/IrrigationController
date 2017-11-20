import { Component, OnInit } from '@angular/core';

import { Device } from '../models/device';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  devices: Device[];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices(): void {
    this.deviceService.getDevices()
    .subscribe(devices => this.devices = devices);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.deviceService.addDevice({ name } as Device)
      .subscribe(hero => {
        this.devices.push(hero);
      });
  }

  delete(device: Device): void {
    this.devices = this.devices.filter(h => h !== device);
    this.deviceService.deleteDevice(device).subscribe();
  }

}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/