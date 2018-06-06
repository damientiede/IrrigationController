import { Component } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import { NavComponent } from './nav.component/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  constructor(private nav: NavComponent ) {}

  home() {
    this.nav.Home();
  }
}
