import {Observable, of} from 'rxjs';

export abstract class GlobalSandbox<T> {
  abstract getItems(): Observable<T[]>;
  abstract add(value: T): Observable<T>;

  delete(id: number){
    return of(null);
  }
}

