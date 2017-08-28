import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IStatus } from '../model/status';
import { IEvent } from '../model/event';

// Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IrrigationControllerService {
    private restUrl = "http://192.168.1.109:8000/api";
    constructor(private http: Http) {}

    getStatus() : Observable <IStatus[]> {
        let url = `${this.restUrl}/status`;        
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getEvents() : Observable <IEvent[]> {
        let url = `${this.restUrl}/events`;
        console.log('IrrigationControllerService.getEvents() '+this.restUrl);
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}