import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { StorageService } from '../storage/storage.service';

import { User } from 'src/app/interfaces/user';
import { UserLoginCred } from 'src/app/interfaces/user-login-cred';

import { BASE_URL } from '../api/base-url';
// import { SocketService } from '../socket/socket.service';

import { PushNotficationService } from '../push-notfication/push-notfication.service';

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
    private _storage: StorageService,
    private _pushNotfication: PushNotficationService,
    // private _socket: SocketService,
    private _http: HttpClient,
    private _router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(
      this._storage.loadSession(this.KEY_LOGGEDIN)
    );
    this.user = this.userSubject.asObservable();
  }

  // GETTERS
  public get userValue(): User {
    return this.userSubject.value;
  }

  // MUTATIONS
  private _handleLogin(user: User, type: string = 'logged') {
    this._storage.storeSession(this.KEY_LOGGEDIN, user);
    this._pushNotfication.openSnackBar(`${user.name} ${type} בהצלחה`)
  }

  private _handleError<T>() {
    return (res: HttpErrorResponse): Observable<T> => {
      this._pushNotfication.openSnackBar(res.error)
      return of(res.error);
    };
  }

  // ACTINOS
  public login(userLoginCred: UserLoginCred) {
    return this._http.post<User>(`${this._url}/login`, userLoginCred).pipe(
      map((user: User) => {
        this._handleLogin(user, 'התחבר');
        this.userSubject.next(user);
        return user;
      }),
      catchError(this._handleError<User>())
    );
  }

  public signup(userCred: User) {
    sessionStorage.clear();
    return this._http.post<User>(`${this._url}/signup`, userCred).pipe(
      map((user: User) => {
        this._handleLogin(user, 'נרשם');
        this.userSubject.next(user);
        return user;
      }),
      catchError(this._handleError<User>())
    );
  }

  public logout() {
    return this._http
      .post(`${this._url}/logout`, null, this._httpOptions)
      .subscribe((_) => {
        this._pushNotfication.openSnackBar(`${this.userValue.name} התנתק בהצלחה`)
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
