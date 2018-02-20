import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
//import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  public id = 0;
  constructor (private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
      });
    }
 }
