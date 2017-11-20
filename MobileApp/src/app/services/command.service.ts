import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Command } from '../models/command';
import { Command } from '../models/command';
// import { Hero } from './hero';
// import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CommandService {

  private commandsUrl = 'http://192.168.1.108:8000/api/command';  // URL to web api

  constructor(
    private http: HttpClient
    // private messageService: MessageService)
  ) { }

  /** GET commands from the server */
  getCommands (): Observable<Command[]> {
    return this.http.get<Command[]>(this.commandsUrl)
      .pipe(
        tap(heroes => this.log(`fetched commands`)),
        catchError(this.handleError('getCommands', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getCommandNo404<Data>(id: number): Observable<Command> {
    const url = `${this.commandsUrl}/${id}`;
    return this.http.get<Command[]>(url)
      .pipe(
        map(commands => commands[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} command id=${id}`);
        }),
        catchError(this.handleError<Command>(`getCommand id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCommand(id: number): Observable<Command> {
    const url = `${this.commandsUrl}/${id}`;
    return this.http.get<Command>(url).pipe(
      tap(_ => this.log(`fetched command id=${id}`)),
      catchError(this.handleError<Command>(`getCommand id=${id}`))
    );
  }

  /* GET heroes whose name contains search term 
  searchHeroes(term: string): Observable<Command[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Command[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found commands matching "${term}"`)),
      catchError(this.handleError<Command[]>('searchCommands', []))
    );
  }
  /*
  //////// Save methods //////////

  /** POST: add a new command to the server */
  addCommand (command: Command): Observable<Command> {
    return this.http.post<Command>(this.commandsUrl, command, httpOptions).pipe(
      tap((command: Command) => this.log(`added command w/ id=${command.id}`)),
      catchError(this.handleError<Command>('addCommand'))
    );
  }

  /** DELETE: delete the command from the server */
  deleteCommand (command: Command | number): Observable<Command> {
    const id = typeof command === 'number' ? command : command.id;
    const url = `${this.commandsUrl}/${id}`;

    return this.http.delete<Command>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted command id=${id}`)),
      catchError(this.handleError<Command>('deleteCommand'))
    );
  }

  /** PUT: update the command on the server */
  updateCommand (command: Command): Observable<any> {
    return this.http.put(this.commandsUrl, command, httpOptions).pipe(
      tap(_ => this.log(`updated command id=${command.id}`)),
      catchError(this.handleError<any>('updateCommand'))
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('CommandService: ' + message);
  }
}

