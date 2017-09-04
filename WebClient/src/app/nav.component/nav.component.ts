import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
    selector: 'nav-component',
    templateUrl: './nav.component.html'    
  })

  export class NavComponent {
      constructor(private router:Router){}

      getActive(route):string {
          if (this.router.url.indexOf(route) > 0) {
              return 'active';
          }
          return '';
      }
  }