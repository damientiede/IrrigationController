import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IStatus } from '../model/status';
import { IDevice } from '../model/device';
import { ISolenoid } from '../model/solenoid';
import { IIrrigationProgram} from '../model/irrigationprogram';
import { IEvent } from '../model/event';
import { ICommand } from '../model/command';
import { IEventType } from '../model/eventtypes';

// Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IrrigationControllerService {
    private restUrl = 'http://192.168.1.113:8000/api';
    constructor(private http: Http) {}
    eventTypes: IEventType[] = [];
    getStatus(): Observable <IStatus[]> {
        const url = `${this.restUrl}/status`;
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDevice(id: number): Observable <IDevice> {
        const url = `${this.restUrl}/devices/${id}`;
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getSolenoids(id: number): Observable <ISolenoid[]> {
        const url = `${this.restUrl}/devices/${id}/solenoids`;
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getIrrigationPrograms(id: number): Observable <IIrrigationProgram[]> {
        const url = `${this.restUrl}/devices/${id}/irrigationprograms`;
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getActiveProgram(id: number): Observable <IIrrigationProgram> {
        const url = `${this.restUrl}/devices/${id}/activeprogram`;
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getEvents(): Observable <IEvent[]> {
        const url = `${this.restUrl}/events`;
        console.log('IrrigationControllerService.getEvents() '+this.restUrl);
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getEventTypes(): Observable <IEventType[]> {
        let url = `${this.restUrl}/eventtypes`;
        console.log('IrrigationControllerService.getEventTypes() '+this.restUrl);
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));        
    }

    sendCommand(cmd:ICommand): Observable <ICommand> {
        let url = `${this.restUrl}/commands`;
        console.log(cmd);
        return this.http.post(url,cmd)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));        

    }
}