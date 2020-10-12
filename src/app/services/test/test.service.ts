import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { Answer } from 'src/app/interfaces/answer';
import { Question } from 'src/app/interfaces/question';
import { Test } from 'src/app/interfaces/test';
import { UserTest } from 'src/app/interfaces/user-test';
import { AuthService } from '../auth/auth.service';
import { UtilService } from '../util/util.service';
import { catchError, tap } from 'rxjs/operators';
import { BASE_URL } from '../api/base-url';
import { TestFilterBy } from 'src/app/interfaces/test-filter-by';
import { PushNotficationService } from '../push-notfication/push-notfication.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private _url = `${BASE_URL}test`;

  constructor(
    private _util: UtilService,
    private _http: HttpClient,
    private _auth: AuthService,
    private _pushNotfication: PushNotficationService,
    private _location: Location,
    private _router: Router // private _mockTest: MockTestService
  ) {
    // this._mockTest.setTests(15)
  }

  private _handleError<T>(err) {
    this._pushNotfication.openSnackBar(err);
    return (res: any): Observable<T> => {
      return of(res);
    };
  }

  public query(filterBy: TestFilterBy = { term: '' }): Observable<Test[]> {
    const queryParams = new URLSearchParams();
    for (const p in filterBy) {
      if (filterBy[p]) {
        queryParams.set(p, filterBy[p]);
      }
    }
    return this._http.get<Test[]>(`${this._url}?${queryParams}`).pipe(
      catchError((err: HttpErrorResponse) => {
        // simple logging, but you can do a lot more, see below
        console.error('An error occurred:', err.error);
        return throwError(err);
      })
      //   tap((tests: Test[]) => {
      //     console.log(tests, ' tests');

      //   }),
      //   catchError(this._handleError<Test[]>('qurey'))
    );
  }
  public getById(testId: string): Observable<Test> {
    return this._http.get<Test>(`${this._url}/${testId}`).pipe(
      // tap((test) => {}),
      catchError((err) => {
        // console.log(err, 'err');
        this._pushNotfication.openSnackBar(err);

        return EMPTY;
      })
      // catchError(this._handleError<Test>(`getTest id=${testId}`))
    );
  }

  public saveTest(test: Test): Observable<Test> {
    test.changes++;
    return test._id ? this._updateTest(test) : this.addTest(test);
  }

  private _updateTest(test: Test): Observable<Test> {
    return this._http
      .put(`${this._url}/${test._id}`, test, this._httpOptions)
      .pipe(catchError(this._handleError<any>('updateTest')));
  }

  public addTest(test: Test): Observable<Test> {
    // todo: transfer in backend
    test.creator = this._auth.userValue;
    return this._http.post(this._url, test, this._httpOptions).pipe(
      tap((testAdded: Test) => {
        this._pushNotfication.openSnackBar(`${testAdded.title} added successfuly`);
      }),
      catchError(this._handleError<Test>('testAdded'))
    );
  }

  public removeTest(testId) {
    return this._http.delete(`${this._url}/${testId}`, this._httpOptions).pipe(
      tap((_) => {
        this._pushNotfication.openSnackBar('The test was successfully deleted');
        this._router.navigate(['/test']);
      }),
      catchError(this._handleError('An error occurred while deleting the test'))
    );
  }

  public getEmptyTest(): Test {
    return {
      title: '',
      creator: null,
      createdAt: null,
      lastUpdatedAt: null,
      timeLimit: null,
      questions: [this.getEmptyQuestion()],
      reviews: [],
      activities: [],
      changes: 0,
      isPublish: true,
    };
  }

  public getEmptyUserTest(testId: string = null): UserTest {
    return {
      testId,
      title: '',
      timeLimit: null,
      timeLeft: null,
      questions: [],
      totalAnswered: 0,
      totalCorrectAnswered: 0,
      activeAt: null,
    };
  }

  public getEmptyQuestion(): Question {
    return {
      _id: this._util.makeId(10),
      isMultipleChoice: false,
      questionContent: '',
      answers: [
        this.getEmptyAnswer('First example'),
        this.getEmptyAnswer('Second example'),
      ],
      correctAnswerIds: [],
    };
  }

  public getEmptyAnswer(answerContent: string = ''): Answer {
    return {
      _id: this._util.makeId(10),
      answerContent,
    };
  }
}
