import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ISolenoid } from '../model/solenoid';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-newedit-solenoid',
  templateUrl: './newedit-solenoid.component.html',
  styleUrls: ['./newedit-solenoid.component.css']
})
export class NewEditSolenoidComponent implements OnInit {
  @Input() solenoid: ISolenoid;
  title: string;
  editMode: boolean;
  hardwareTypes: string[] = ['GPIO', 'Distributed', 'SPI'];

  constructor (private service: IrrigationControllerService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    }
  ngOnInit() {
    console.log(this.solenoid);
    if (this.solenoid != null) {
      this.title = `Edit Solenoid - ${this.solenoid.Id}`;
    } else {
      this.title = 'New Solenoid';
    }
  }
  editClick() {
    console.log('Edit clicked');
    console.log(this);
    this.editMode = true;
  }
  onSelect(ht) {
    console.log(`${ht} selected`);
  }
  cancel() {
    this.editMode = false;
  }
  save() {
    console.log(this.solenoid);
    this.service.saveSolenoid(this.solenoid)
      .subscribe(() => {},
      error => () => {
        console.log('Something went wrong...');
        this.toastr.error('Something went wrong...','Damn');
      },
      () => {
        console.log('Success');
        this.toastr.success('It will take a few moments to process.','Command sent' );
        //this._slimLoadingBarService.complete();
    });
  }
}
