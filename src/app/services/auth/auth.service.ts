import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { StorageService } from '../storage/storage.service';

import { User } from 'src/app/interfaces/user';
import { UserLoginCred } from 'src/app/interfaces/user-login-cred';

import { BASE_URL } from '../http/base-url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // STATE
  public KEY_LOGGEDIN = 'loggedin-user';
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private _url = `${BASE_URL}auth`;

  constructor(
    private _storageService: StorageService,
    private _http: HttpClient,
    private _router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(
      this._storageService.loadSession(this.KEY_LOGGEDIN)
    );
    this.user = this.userSubject.asObservable();
  }

  // GETTERS
  public get userValue(): User {
    return this.userSubject.value;
  }

  // MUTATIONS

  private _handleLogin(user: User) {
    try {
    this._storageService.storeSession(this.KEY_LOGGEDIN, user);
    } catch (err) {
      console.log('ERROR IN _handleLogin', err);
    }
  }

  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error.error.error);
      console.log(result, 'result');
      // log to console instead

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

  public login(userLoginCred: UserLoginCred) {
    return this._http.post<User>(`${this._url}/login`, userLoginCred).pipe(
      map((user: User) => {
        this._handleLogin(user);
        this.userSubject.next(user);
        return user;
      }),
      catchError(
        this._handleError<User>(`login userLoginCred=${userLoginCred}`)
      )
    );
  }

  public signup(userCred: User) {
    sessionStorage.clear();
    return this._http.post<User>(`${this._url}/signup`, userCred).pipe(
      map((user: User) => {
        this._handleLogin(user);
        this.userSubject.next(user);
        return user;
      }),
      catchError(this._handleError<User>(`signup user=${this._url}`))
    );
  }

  public logout() {
    return this._http
      .post(`${this._url}/logout`, null, this._httpOptions)
      .subscribe((res: any) => {
        // const {message} = res
        sessionStorage.clear();
        this.userSubject.next(null);
        this._router.navigate(['/login']);
      });
  }

  public getEmptyUser(): User {
    return {
      joinAt: null,
      name: '',
      email: '',
      password: '',
      isAdmin: false,
      tests: [],
    };
  }

}
