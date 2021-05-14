import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { Monster } from '../models/monster';


@Injectable({ providedIn: 'root' })
export class MonsterService {

  private monstersUrl = '/monsters';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET monsters from the server */
  getMonsters(sort?: string, order?: 'asc' | 'desc', page?: number, limit?: number): Observable<Monster[]> {
    return this.http.get<Monster[]>(this.monstersUrl, 
        {
            params: {_sort: sort, 
                _order: order,
                _page: `${page}`,
                _limit: `${limit}`
                }
        })
      .pipe(
        tap(_ => this.log('fetched monsters')),
        catchError(this.handleError<Monster[]>('getMonsters', []))
      );
  }

  /** GET monster by id. Will 404 if id not found */
  getMonster(id: number): Observable<Monster> {
    const url = `${this.monstersUrl}/${id}`;
    return this.http.get<Monster>(url).pipe(
      switchMap(monster => this.updatePopularity(monster.id, +monster.popularity + 1)),
      tap(_ => this.log(`fetched monster id=${id}`)),
      catchError(this.handleError<Monster>(`getMonster id=${id}`))
    );
  }

  /* GET monsters whose name contains search term */
  searchMonsters(term: string): Observable<Monster[]> {
    if (!term.trim()) {
      // if not search term, return empty monster array.
      return of([]);
    }
    return this.http.get<Monster[]>(`${this.monstersUrl}?q=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found monsters matching "${term}"`) :
         this.log(`no monsters matching "${term}"`)),
      catchError(this.handleError<Monster[]>('searchMonsters', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new monster to the server */
  addMonster(monster: Monster): Observable<Monster> {
    return this.http.post<Monster>(this.monstersUrl, monster, this.httpOptions).pipe(
      tap((newMonster: Monster) => this.log(`added monster w/ id=${newMonster.id}`)),
      catchError(this.handleError<Monster>('addMonster'))
    );
  }

  /** DELETE: delete the monster from the server */
  deleteMonster(id: number): Observable<Monster> {
    const url = `${this.monstersUrl}/${id}`;

    return this.http.delete<Monster>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted monster id=${id}`)),
      catchError(this.handleError<Monster>('deleteMonster'))
    );
  }

  /** PUT: update the monster on the server */
  updateMonster(monster: Monster): Observable<any> {
    return this.http.put(`${this.monstersUrl}/${monster.id}`, monster, this.httpOptions).pipe(
      tap(_ => this.log(`updated monster id=${monster.id}`)),
      catchError(this.handleError<any>('updateMonster'))
    );
  }
  
  updatePopularity(id: number, popularity: number): Observable<Monster> {
    return this.http.patch<Monster>(`${this.monstersUrl}/${id}`, {popularity});
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a MonstersService message with the MessageService */
  private log(message: string) {
    console.log(`MonsterService: ${message}`);
  }
}
