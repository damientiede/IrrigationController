import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IStatus } from '../model/status';
import { IDevice } from '../model/device';
import { ISchedule } from '../model/schedule';
import { ISolenoid } from '../model/solenoid';
import { IAlarm } from '../model/alarm';
import { IAnalog } from '../model/analog';
import { ISpi } from '../model/spi';
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
    private restUrl = 'http://delta:8000/api';
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

    getDevices(username: string): Observable <IDevice[]> {
        const url = `${this.restUrl}/devices`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getSchedules(id: number): Observable <ISchedule[]> {
        const url = `${this.restUrl}/devices/${id}/schedules`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getSolenoids(id: number): Observable <ISolenoid[]> {
        const url = `${this.restUrl}/devices/${id}/solenoids`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getAlarms(id: number): Observable <IAlarm[]> {
        const url = `${this.restUrl}/devices/${id}/alarms`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getAnalogs(id: number): Observable <IAnalog[]> {
        const url = `${this.restUrl}/devices/${id}/analogs`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getSpis(id: number): Observable <ISpi[]> {
        const url = `${this.restUrl}/devices/${id}/spis`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getSolenoid(id: number): Observable <ISolenoid> {
        const url = `${this.restUrl}/solenoids/${id}`;
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getAlarm(id: number): Observable <IAlarm> {
        const url = `${this.restUrl}/alarms/${id}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getAnalog(id: number): Observable <IAnalog> {
        const url = `${this.restUrl}/analogs/${id}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getSpi(id: number): Observable <ISpi> {
        const url = `${this.restUrl}/spis/${id}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
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
    getEvents(id: number): Observable <IEvent[]> {
        const url = `${this.restUrl}/devices/${id}/events`;
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

    createSolenoid(solenoid: ISolenoid): Observable <ISolenoid> {
        let url = `${this.restUrl}/solenoids`;
        return this.http.post(url, solenoid)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    createAlarm(alarm: IAlarm): Observable <ISolenoid> {
        let url = `${this.restUrl}/alarms`;
        return this.http.post(url, alarm)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    createAnalog(analog: IAnalog): Observable <IAnalog> {
        let url = `${this.restUrl}/analogs`;
        return this.http.post(url, analog)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    createSpi(analog: ISpi): Observable <ISpi> {
        let url = `${this.restUrl}/spis`;
        return this.http.post(url, analog)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveSolenoid(solenoid: ISolenoid): Observable <ISolenoid> {
        let url = `${this.restUrl}/solenoids/${solenoid.id}`;
        return this.http.put(url, solenoid)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveAlarm(alarm: IAlarm): Observable <IAlarm> {
        console.log(alarm);
        let url = `${this.restUrl}/alarms/${alarm.id}`;
        return this.http.put(url, alarm)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveSpi(spi: ISpi): Observable <ISpi> {
        console.log(spi);
        let url = `${this.restUrl}/spis/${spi.id}`;
        return this.http.put(url, spi)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveAnalog(analog: IAnalog): Observable <IAnalog> {
        console.log(analog);
        let url = `${this.restUrl}/analogs/${analog.id}`;
        return this.http.put(url, analog)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteSolenoid(solenoid: ISolenoid): Observable <ISolenoid> {
        let url = `${this.restUrl}/solenoids/${solenoid.id}`;
        return this.http.delete(url)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteAlarm(alarm: IAlarm): Observable <IAlarm> {
        let url = `${this.restUrl}/alarms/${alarm.id}`;
        return this.http.delete(url)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteAnalog(analog: IAnalog): Observable <IAnalog> {
        let url = `${this.restUrl}/alarms/${analog.id}`;
        return this.http.delete(url)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteSpi(analog: ISpi): Observable <ISpi> {
        let url = `${this.restUrl}/spis/${analog.id}`;
        return this.http.delete(url)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}