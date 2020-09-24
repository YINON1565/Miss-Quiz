import { Injectable, isDevMode } from '@angular/core';
import { never, Observable, of } from 'rxjs';
import { FilterByTest } from 'src/app/interfaces/filter-by-test';
import { Test } from 'src/app/interfaces/test';

import {Tests} from './mock-tests'

@Injectable({
  providedIn: 'root'
})
export class TestService {
private _tests : Test[] = Tests
  constructor() { }
  private _isDevMode = isDevMode()
  public query(filterBy?: FilterByTest) : Observable<Test[]>{
    return this._isDevMode?  of(this._tests): never()
   }
   public getById(testId: string) : Observable<Test> {
     return of (this._tests.find(test=> test._id === testId))
   }
}
