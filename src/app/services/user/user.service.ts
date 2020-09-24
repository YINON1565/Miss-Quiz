import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { StorageService } from '../storage/storage.service';

import { User } from 'src/app/interfaces/user';

import { BASE_URL } from '../http/base-url';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _storageService: StorageService,
    private _http: HttpClient
  ) {}

  //HTTP
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private _url = `${BASE_URL}user`;

  // STATE
  public user: User;
  public users: User[];

  // GETTERS

  // MUTATIONS
  private _setUser(user: User) {
    this.user = user;
  }

  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this._log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // private _log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // }

  // ACTINOS

  // public getUser(): Observable<User> {
  //   this._loggedinUser = this._storageService.load(this.KEY_USER);
  //   return of(this._loggedinUser);
  // }

  public getById(userId: string): Observable<User> {
    return this._http.get<User>(`${this._url}/${userId}`).pipe(
      tap((user) => {
        this._setUser(user);
        // this.log(`fetched hero id=${id}`);
      }),
      catchError(this._handleError<User>(`getUser id=${userId}`))
    );
  }

  public getByEmail(email: string): Observable<User> {
    return this._http.get<User>(`${this._url}/${email}`).pipe(
      tap((user) => {
        // this._setUser(user);
        // this.log(`fetched hero id=${id}`);
      }),
      catchError(this._handleError<User>(`getUser id=${email}`))
    );
  }

  // public loadUser() {
  //   return this.getUser();
  //   // .pipe(
  //   //   tap((user) => {
  //   //     let test = user.tests.find((test) => (test._id = testId));
  //   //     if (test) {
  //   //     } else {
  //   //     }
  //   //   })
  //   // );
  //   // this._testService.getById(testId).pipe(tap((test) => {}));
  // }
}
