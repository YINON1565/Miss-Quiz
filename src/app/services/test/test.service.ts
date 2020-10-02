import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Answer } from 'src/app/interfaces/answer';
import { FilterByTest } from 'src/app/interfaces/filter-by-test';
import { Question } from 'src/app/interfaces/question';
import { Test } from 'src/app/interfaces/test';
import { User } from 'src/app/interfaces/user';
import { UserTest } from 'src/app/interfaces/user-test';
import { AuthService } from '../auth/auth.service';
import { UtilService } from '../util/util.service';
import { catchError, tap } from 'rxjs/operators';
import { BASE_URL } from '../api/base-url';

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
  ) {
    // this.setTests(15)
  }

  // public setTests(count: number): void {
  //   for (let i = 0; i < count; i++) {
  //     let test = this.setTest(
  //       this._util.makeLorem(25, 'he'),
  //       this._auth.userValue,
  //       Date.now() + 360000 * 24 * this._util.getRandomInt(-1000, 1000),
  //       Math.random() > 0.5 ? 600 * this._util.getRandomInt(1, 9) : null,
  //       this.setQuestions(this._util.getRandomInt(10, 36))
  //     );
  //     test.questions.forEach((q) => {
  //       q.isMultipleChoice
  //         ? (q.correctAnswerIds = [
  //             q.answers[this._util.getRandomInt(0, 3)]._id,
  //             q.answers[this._util.getRandomInt(4, 6)]._id,
  //           ])
  //         : q.correctAnswerIds.push(
  //             q.answers[this._util.getRandomInt(0, 3)]._id
  //           );
  //     });
  //     console.log(test, 'test');

  //     this._addTest(test).subscribe();
  //   }
  // }

  // public setTest(
  //   title: string,
  //   creator: User,
  //   createdAt: number,
  //   timeLimit: number,
  //   questions: Question[]
  // ): Test {
  //   console.log(createdAt, 'createdAt');

  //   return {
  //     title,
  //     creator,
  //     createdAt,
  //     lastUpdatedAt: null,
  //     timeLimit,
  //     questions,
  //     activities: [],
  //     changes: 0,
  //     reviews: [],
  //     isPublish: true,
  //   };
  // }

  // public setQuestions(count: number): Question[] {
  //   const question = [];
  //   for (let i = 0; i < count; i++) {
  //     let isMultipleChoice = Math.random() > 0.8;
  //     question.push(
  //       this.setQuestion(
  //         isMultipleChoice,
  //         this._util.makeLorem(40, 'he'),
  //         this.setAnswers(isMultipleChoice ? 6 : 4),
  //         []
  //       )
  //     );
  //   }
  //   return question;
  // }
  // public setQuestion(
  //   isMultipleChoice: boolean,
  //   questionContent: string,
  //   answers: Answer[],
  //   correctAnswerIds: string[]
  // ): Question {
  //   return {
  //     _id: this._util.makeId(10),
  //     isMultipleChoice,
  //     questionContent,
  //     answers,
  //     correctAnswerIds,
  //   };
  // }

  // public setAnswers(count: number): Answer[] {
  //   const answers = [];
  //   for (let i = 0; i < count; i++) {
  //     answers.push(this.setAnswer(this._util.makeLorem(45, 'he')));
  //   }
  //   return answers;
  // }
  // public setAnswer(answerContent: string): Answer {
  //   return {
  //     _id: this._util.makeId(10),
  //     answerContent,
  //   };
  // }

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

  public query(filterBy?: FilterByTest): Observable<Test[]> {
    // public query(filterBy?: FilterByTest): Observable<(Test | UserTest)[]> {
    // return of(this._tests)
    // let tests = this._tests.map((test) => {
    //   let testUser = this._auth.userValue.tests.find((testUser) => {
    //     return testUser.testId === test._id;
    //   });
    //   return testUser ? testUser : test;

    return this._http.get<Test[]>(this._url).pipe(
      tap((tests: Test[]) => {
        console.log('Tests: ', tests);
        // this._setUsers(users);
      }),
      catchError(this._handleError<Test[]>('qurey'))
    );

    // });
    // if (filterBy.isSort && filterBy.type) {
    //   tests = tests.sort((a, b) => {
    //     return a.totalAnswered - b.totalAnswered;
    //   });
    //   tests = filterBy.type === 'active' ? tests.reverse() : tests;
    // } else if (filterBy.type) {
    //   tests = tests.filter((test) =>
    //     filterBy.type === 'active' ? test.totalAnswered : !test.totalAnswered
    //   );
    // }
    // return of(tests);
  }
  public getById(testId: string): Observable<Test> {
    return this._http.get<Test>(`${this._url}/${testId}`).pipe(
      tap((test) => {
        console.log('Test: ', test);
        // this.log(`fetched hero id=${id}`);
      }),
      catchError(this._handleError<Test>(`getTest id=${testId}`))
    );
  }

  public saveTest(test: Test): Observable<Test> {
    test.changes++
    return test._id ? this._updateTest(test) : this._addTest(test);
  }

  private _updateTest(test: Test): Observable<Test> {
    return this._http
      .put(`${this._url}/${test._id}`, test, this._httpOptions)
      .pipe(
        tap((testUpdated) => {
          console.log(testUpdated, 'testUpdated in service');
        }),
        catchError(this._handleError<any>('updateTest'))
      );
  }

  // private _buildTestChange(type): TestChange {
  //   return {
  //     type,
  //     at: Date.now(),
  //   };
  // }
  private _addTest(test: Test): Observable<Test> {
    // test.changes.push(this._buildTestChange('addTest'));
    // todo: transfer in backend
    test.creator = this._auth.userValue;
    return this._http.post(this._url, test, this._httpOptions).pipe(
      tap((testAdded: Test) => {
        console.log(testAdded, 'testAdded in service');
      }),
      catchError(this._handleError<Test>('testAdded'))
    );
  }

  public removeTest(testId) {
    return this._http.delete(`${this._url}/${testId}`, this._httpOptions).pipe(
      tap((msg) => {
        console.log(msg, 'testRemoved in service');
      }),
      catchError(this._handleError<any>('removeTest'))
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
