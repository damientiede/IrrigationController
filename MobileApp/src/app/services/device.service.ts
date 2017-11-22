import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Device } from '../models/device';
import { Command } from '../models/command';
import { IrrigationProgram } from '../models/irrigation-program';
// import { Hero } from './hero';
// import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DeviceService {

  private devicesUrl = 'http://192.168.1.108:8000/api/devices';  // URL to web api

  constructor(
    private http: HttpClient
    // private messageService: MessageService)
  ) { }

  /** GET devices from the server */
  getDevices (): Observable<Device[]> {
    return this.http.get<Device[]>(this.devicesUrl)
      .pipe(
        tap(devices => console.log(`fetched devices`)),
        catchError(this.handleError('getDevices', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getDeviceNo404<Data>(id: number): Observable<Device> {
    const url = `${this.devicesUrl}/${id}`;
    return this.http.get<Device[]>(url)
      .pipe(
        map(devices => devices[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} device id=${id}`);
        }),
        catchError(this.handleError<Device>(`getDevice id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getDevice(id: number): Observable<Device> {
    const url = `${this.devicesUrl}/${id}`;
    return this.http.get<Device>(url).pipe(
      tap(_ => console.log(`fetched device id=${id}`)),
      catchError(this.handleError<Device>(`getDevice id=${id}`))
    );
  }

  /* GET heroes whose name contains search term 
  searchHeroes(term: string): Observable<Device[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Device[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => console.log(`found devices matching "${term}"`)),
      catchError(this.handleError<Device[]>('searchDevices', []))
    );
  }
  /*
  //////// Save methods //////////

  /** POST: add a new device to the server */
  addDevice (device: Device): Observable<Device> {
    return this.http.post<Device>(this.devicesUrl, device, httpOptions).pipe(
      tap((device: Device) => console.log(`added device w/ id=${device.id}`)),
      catchError(this.handleError<Device>('addDevice'))
    );
  }

  /** DELETE: delete the device from the server */
  deleteDevice (device: Device | number): Observable<Device> {
    const id = typeof device === 'number' ? device : device.id;
    const url = `${this.devicesUrl}/${id}`;

    return this.http.delete<Device>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted device id=${id}`)),
      catchError(this.handleError<Device>('deleteDevice'))
    );
  }

  /** PUT: update the device on the server */
  updateHero (device: Device): Observable<any> {
    return this.http.put(this.devicesUrl, device, httpOptions).pipe(
      tap(_ => console.log(`updated device id=${device.id}`)),
      catchError(this.handleError<any>('updateDevice'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
 /*  private log(message: string) {
    this.messageService.add('DeviceService: ' + message);
  } */
}

