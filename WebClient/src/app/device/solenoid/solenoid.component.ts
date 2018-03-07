import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";
import { ISolenoid } from '../../model/solenoid';
import { NavComponent } from '../../nav.component/nav.component';
import { IrrigationControllerService} from '../../services/IrrigationController.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-solenoid',
  templateUrl: './solenoid.component.html',
  styleUrls: ['./solenoid.component.css']
})
export class SolenoidComponent implements OnInit {
  id= 0;
  title= 'New solenoid';
  loaded = false;
  solenoid: ISolenoid;
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
        alert('Missing Solenoid ID');
        this.loaded = true;
      }
      if (this.id > 0) {
        this.title = `Edit solenoid - ${this.id}`;
        this.getSolenoid(this.id);
      }
    });
  }
  getSolenoid(id: number) {
    console.log('getSolenoid()');
    this.service
      .getSolenoid(id)
      .subscribe((d: ISolenoid) => {
            console.log(d);
            this.solenoid = d;
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
    console.log(this.solenoid);
    this.service.saveSolenoid(this.solenoid)
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
