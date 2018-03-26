import {Injectable} from "@angular/core";
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from "@angular/router";
@Component({
    selector: 'nav-component',
    templateUrl: './nav.component.html',
    styles:['a:hover{cursor:pointer}']
})

@Injectable()
export class NavComponent {
    constructor(private router: Router,
                private location: Location) {}

    getActive(route): string {
        if (this.router.url.indexOf(route) > 0) {
            return 'active';
        }
        return '';
    }

    public NavTo(url) {
        this.router.navigate([url]);
    }

    public Back() {
        this.location.back();
    }
}