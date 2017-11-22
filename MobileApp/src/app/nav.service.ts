import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class NavService {
    constructor(private router: Router) {

    }

    toStatus() {
        this.router.navigate(['status']);
    }

    toSchedules() {
        this.router.navigate(['schedules']);
    }

    toHistory() {
        this.router.navigate(['history']);
    }
}
