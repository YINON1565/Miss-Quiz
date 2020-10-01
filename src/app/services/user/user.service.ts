import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { StorageService } from '../storage/storage.service';
import { AuthService } from '../auth/auth.service';

import { User } from 'src/app/interfaces/user';

import { BASE_URL } from '../api/base-url';
import { UserFiletrBy } from 'src/app/interfaces/user-filetr-by';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // STATE
  public user: User;
  public users: User[];
  //HTTP
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private _url = `${BASE_URL}user`;
  constructor(
    private _storageService: StorageService,
    private _http: HttpClient,
    private _authService: AuthService
  ) {}

  // GETTERS

  // MUTATIONS
  private _setUser(user: User) {
    this.user = user;
  }

  private _setUsers(users: User[]) {
    this.users = users;
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

  private _log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }

  // ACTINOS

  public query(filterBy: UserFiletrBy = {}): Observable<User[]> {
    return this._http.get<User[]>(`${this._url}`).pipe(
      tap((users: User[]) => {
        this._setUsers(users);
      }),
      catchError(this._handleError<User[]>('qurey'))
    );
  }

  public getById(userId: string): Observable<User> {
    return this._http.get<User>(`${this._url}/${userId}`).pipe(
      tap((user) => {
        this._setUser(user);
        // this.log(`fetched hero id=${id}`);
      }),
      catchError(this._handleError<User>(`getUser id=${userId}`))
    );
  }

  public updateUser(user: User) {
    return this._http
      .put(`${this._url}/${user._id}`, user, this._httpOptions)
      .pipe(
        map((userUpdated: User) => {
          console.log(userUpdated, 'userUpdated in service');
          if (user._id == this._authService.userValue._id) {
            this._storageService.storeSession(
              this._authService.KEY_LOGGEDIN,
              userUpdated
            );
            this._authService.userSubject.next(userUpdated);
          }
          this._log(`updated user id=${userUpdated._id}`);
          return userUpdated;
        }),
        catchError(this._handleError<any>('updateUser'))
      );
  }

  public removeUser(userId: string) {
    return this._http.delete(`${this._url}/${userId}`).pipe(
      map((res) => {
        if (userId == this._authService.userValue._id) {
          this._authService.logout();
        }
      })
    );
  }
}
