import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
    selector: 'nav-component',
    templateUrl: './nav.component.html',
    styles:['a:hover{cursor:pointer}'] 
  })

  export class NavComponent {
      constructor(private router:Router){}

      getActive(route):string {
          //console.log(route);
          if (this.router.url.indexOf(route) > 0) {
              return 'active';
          }
          return '';
      }

      navTo(url){
          this.router.navigate([url]);
      }
  }