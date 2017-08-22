import { Component, OnInit } from '@angular/core';
//import { ToasterService } from 'angular2-toaster/angular2-toaster';
//import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { IrrigationControllerService} from './services/IrrigationController.service';
import {
  IrrigationControllerStatus
} from './model/status'
@Component({
  selector: 'app-root',
  templateUrl: './debug.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {  
  //ictrlService:IrrigationControllerService;
  status : IrrigationControllerStatus;
  loaded:boolean = false;
  constructor (private dataService:IrrigationControllerService) { }

  ngOnInit() {
    this.dataService
      .getStatus<IrrigationControllerStatus[]>()
      .subscribe((data: IrrigationControllerStatus[]) => {
              if (data.length > 0) {
                this.status = data[0];
              }            
            },
            error => () => {
                console.log('Something went wrong...');
                //this._toasterService.pop('error', 'Damn', 'Something went wrong...');
            },
            () => {
                console.log('Success');
                //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
                //this._slimLoadingBarService.complete();
            });         
  }

  isLoaded() {
    return this.loaded;
  }
    
}
