import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { StorageService } from '../storage/storage.service';

import { User } from 'src/app/interfaces/user';
import { UserLoginCred } from 'src/app/interfaces/user-login-cred';

import { BASE_URL } from '../http/base-url';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _storageService: StorageService,
    private _userService: UserService,
    private _http: HttpClient,
    private _router: Router
  ) {}

  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private _url = `${BASE_URL}auth`;

  // STATE
  private _loggedinUser: User = this.getLoggeinUser();
  private KEY_LOGGEDIN = 'loggedin-user';

  // GETTERS
  // public get loggedinUser(): User {
  //   return this._loggedinUser;
  // }

  // MUTATIONS
  private _setLoggedinUser(user: User) {
    this._loggedinUser = user;
  }

  public getLoggeinUser() {
    return this._storageService.loadSession(this.KEY_LOGGEDIN);
  }

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
    return this._http
      .post<User>(`${this._url}/login`, userLoginCred, this._httpOptions)
      .pipe(
        tap((user) => {
          this._handleLogin(user);
          this._setLoggedinUser(user);
        }),
        catchError(
          this._handleError<User>(`login userLoginCred=${userLoginCred}`)
        )
      );
  }

  public signup(userCred: User) {
    // this._checkIsAccountExists(userCred.email)
    sessionStorage.clear();
    return this._http
      .post<User>(`${this._url}/signup`, userCred, this._httpOptions)
      .pipe(
        tap((user) => {
          this._handleLogin(user);
          this._setLoggedinUser(user);
        }),
        catchError(this._handleError<User>(`signup user=${this._url}`))
      );
  }

  public logout() {
    console.log(`${this._url}/logout`, '`${this._url}/logout`');

    return this._http
      .post(`${this._url}/logout`, null, this._httpOptions)
      .subscribe((res: any) => {
        // const {message} = res
        sessionStorage.clear();
        this._router.navigate(['/login']);
      });
    // .subscribe(
    //   tap(_ => {
    //     sessionStorage.clear();
    //   }),
    //   catchError(this._handleError('logout'))
    // );
  }

  // private _checkIsAccountExists(email) {
  //   return this._userService.getByEmail(email)
  // }

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

  // public signUp(
  //   name: string,
  //   email: string,
  //   password: string
  // ): Observable<User> {
  //   let user: User = {
  //     name,
  //     email,
  //     password,
  //     joinAt: null,
  //     isAdmin: false,
  //     tests: [],
  //   };
  //   this._storageService.store(this.KEY_USER, user);
  //   return of(user);
  // }

  // public buildNewTest(test: Test) {
  //   this.getUser().subscribe((user) => {

  //     user.tests.push(test);
  //     this._storageService.store(this.KEY_USER, user);
  //   });

  //   // return this.getUser().pipe(
  //   //   tap((user) => {
  //   //     user.tests.push(test);
  //   //     this._storageService.store(this.KEY_USER, user);
  //   //   })
  //   // );
  //   //   forkJoin(this.getUser(), this._testService.getById(testId)).subscribe(res=> {
  //   //   res[0].tests.push(res[1])
  //   //   this._storageService.store(this.KEY_USER, res[0]);
  //   //  })
  //   // return this._testService
  //   //   .getById(testId)
  //   //   .subscribe((test) => this._loggedinUser.tests.push(test)).unsubscribe();
  //   // return of (this.getUser().subscribe(user=> user.tests.push(test)))
  // }
}
