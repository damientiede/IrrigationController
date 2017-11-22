import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { IrrigationProgram } from '../models/irrigation-program';
// import { Hero } from './hero';
// import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IrrigationProgramService {

  private irrigationProgramUrl = 'http://192.168.1.108:8000/api/irrigationProgram';  // URL to web api

  constructor(
    private http: HttpClient
    // private messageService: MessageService)
  ) { }

  /** GET irrigationPrograms from the server */
  getIrrigationPrograms (): Observable<IrrigationProgram[]> {
    return this.http.get<IrrigationProgram[]>(this.irrigationProgramUrl)
      .pipe(
        tap(heroes => console.log(`fetched irrigationPrograms`)),
        catchError(this.handleError('getIrrigationPrograms', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getIrrigationProgramNo404<Data>(id: number): Observable<IrrigationProgram> {
    const url = `${this.irrigationProgramUrl}/${id}`;
    return this.http.get<IrrigationProgram[]>(url)
      .pipe(
        map(irrigationPrograms => irrigationPrograms[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} irrigationProgram id=${id}`);
        }),
        catchError(this.handleError<IrrigationProgram>(`getIrrigationProgram id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getIrrigationProgram(id: number): Observable<IrrigationProgram> {
    const url = `${this.irrigationProgramUrl}/${id}`;
    return this.http.get<IrrigationProgram>(url).pipe(
      tap(_ => console.log(`fetched irrigationProgram id=${id}`)),
      catchError(this.handleError<IrrigationProgram>(`getIrrigationProgram id=${id}`))
    );
  }

  /* GET heroes whose name contains search term 
  searchHeroes(term: string): Observable<IrrigationProgram[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<IrrigationProgram[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => console.log(`found irrigationPrograms matching "${term}"`)),
      catchError(this.handleError<IrrigationProgram[]>('searchIrrigationPrograms', []))
    );
  }
  /*
  //////// Save methods //////////

  /** POST: add a new irrigationProgram to the server */
  addIrrigationProgram (irrigationProgram: IrrigationProgram): Observable<IrrigationProgram> {
    return this.http.post<IrrigationProgram>(this.irrigationProgramUrl, irrigationProgram, httpOptions).pipe(
      tap((irrigationProgram: IrrigationProgram) => console.log(`added irrigationProgram w/ id=${irrigationProgram.id}`)),
      catchError(this.handleError<IrrigationProgram>('addIrrigationProgram'))
    );
  }

  /** DELETE: delete the irrigationProgram from the server */
  deleteIrrigationProgram (irrigationProgram: IrrigationProgram | number): Observable<IrrigationProgram> {
    const id = typeof irrigationProgram === 'number' ? irrigationProgram : irrigationProgram.id;
    const url = `${this.irrigationProgramUrl}/${id}`;

    return this.http.delete<IrrigationProgram>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted irrigationProgram id=${id}`)),
      catchError(this.handleError<IrrigationProgram>('deleteIrrigationProgram'))
    );
  }

  /** PUT: update the irrigationProgram on the server */
  updateIrrigationProgram (irrigationProgram: IrrigationProgram): Observable<any> {
    return this.http.put(this.irrigationProgramUrl, irrigationProgram, httpOptions).pipe(
      tap(_ => console.log(`updated irrigationProgram id=${irrigationProgram.id}`)),
      catchError(this.handleError<any>('updateIrrigationProgram'))
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
  /* private log(message: string) {
    this.messageService.add('IrrigationProgramService: ' + message);
  } */
}

