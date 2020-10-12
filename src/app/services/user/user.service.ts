import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { StorageService } from '../storage/storage.service';
import { AuthService } from '../auth/auth.service';

import { User } from 'src/app/interfaces/user';

import { BASE_URL } from '../api/base-url';
import { UserFilterBy } from 'src/app/interfaces/user-filter-by';

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
    return (res: any): Observable<T> => {
      return of(res);
    };
  }

  // ACTINOS

  public query(filterBy: UserFilterBy = {term: ''}): Observable<User[]> {
    const queryParams = new URLSearchParams();
    for (const p in filterBy) {
      if (filterBy[p]) {
        queryParams.set(p, filterBy[p]);
      }
    }
    return this._http.get<User[]>(`${this._url}?${queryParams}`).pipe(
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
      }),
      catchError(this._handleError<User>(`getUser id=${userId}`))
    );
  }

  public updateUser(user: User) {
    return this._http
      .put(`${this._url}/${user._id}`, user, this._httpOptions)
      .pipe(
        map((userUpdated: User) => {
          if (user._id == this._authService.userValue._id) {
            this._storageService.storeSession(
              this._authService.KEY_LOGGEDIN,
              userUpdated
            );
            this._authService.userSubject.next(userUpdated);
          }
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
