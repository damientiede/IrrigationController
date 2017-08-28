import { Component, OnInit } from '@angular/core';
//import { ToasterService } from 'angular2-toaster/angular2-toaster';
//import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { IrrigationControllerService} from './services/IrrigationController.service';
import { IStatus} from './model/status';
import { IEvent } from './model/event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {  
  //ictrlService:IrrigationControllerService;
  status : IStatus;
  elapsed:number = 0;
  loaded:boolean = false;
  constructor (private dataService:IrrigationControllerService) { }

  ngOnInit() {
    this.getStatus();    
  }

  getStatus() {
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
  getStatusClass(){
    return '';
  }
  formatDateShort(date) {
    return date;
  }
  getEnd() {
    return '';
  }
}
