import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

export abstract class BaseService<t> {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  protected constructor(
    private http: HttpClient,
    private baseUrl: string
  ) { }

  /** GET items from the server */
  getItems(sort?: string, order?: 'asc' | 'desc', page?: number, limit?: number): Observable<t[]> {
    return this.http.get<t[]>(this.baseUrl,
      {
        params: {
          ...sort ? {_sort: sort} : {},
          ...order ? {_order: order} : {},
          ...page ? {_page: `${page}`} : {},
          ...limit ? {_limit: `${limit}`} : {}
        }
      })
      .pipe(
        tap(_ => this.log('fetched rows')),
        catchError(this.handleError('getItems', []))
      );
  }

  /** GET item by id. Will 404 if id not found */
  getItem(id: number): Observable<t> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<t>(url).pipe(
      switchMap((item: any) => this.updatePopularity(item.id, +item.popularity + 1)),
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError(`getItem id=${id}`))
    );
  }

  /* GET items whose name contains search term */
  search(term: string): Observable<t[]> {
    if (!term.trim()) {
      // if not search term, return empty item array.
      return of([]);
    }
    return this.http.get<t[]>(`${this.baseUrl}?q=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found items matching "${term}"`) :
        this.log(`no items matching "${term}"`)),
      catchError(this.handleError('search', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new item to the server */
  add(item: any): Observable<t> {
    return this.http.post<t>(this.baseUrl, item, this.httpOptions).pipe(
      tap((newitem: any) => this.log(`added item w/ id=${newitem.id}`)),
      catchError(this.handleError('add'))
    );
  }

  /** DELETE: delete the item from the server */
  delete(id: number): Observable<t> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<t>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError('delete'))
    );
  }

  /** PUT: update the item on the server */
  update(item: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${item.id}`, item, this.httpOptions).pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError('update'))
    );
  }

  updatePopularity(id: number, popularity: number): Observable<t> {
    return this.http.patch<t>(`${this.baseUrl}/${id}`, {popularity});
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }

  /** Log a itemsService message with the MessageService */
  private log(message: string) {
    console.log(`itemService: ${message}`);
  }
}
