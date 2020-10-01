import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Answer } from 'src/app/interfaces/answer';
import { FilterByTest } from 'src/app/interfaces/filter-by-test';
import { Question } from 'src/app/interfaces/question';
import { Test } from 'src/app/interfaces/test';
import { User } from 'src/app/interfaces/user';
import { UserTest } from 'src/app/interfaces/user-test';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../storage/storage.service';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private KEY_TESTS = 'newTests';

  constructor(
    private _util: UtilService,
    private _auth: AuthService,
    private _storage: StorageService
  ) {}

  private _tests: Test[] = this._getTests();
  private _getTests(): Test[] {
    let tests: Test[] = this._storage.load(this.KEY_TESTS);
    if (!tests) {
      tests = this.setTests(100);
      tests.forEach((test) => {
        test.questions.forEach((q) => {
          q.isMultipleChoice
            ? (q.correctAnswerIds = [
                q.answers[this._util.getRandomInt(0, 3)]._id,
                q.answers[this._util.getRandomInt(4, 6)]._id,
              ])
            : q.correctAnswerIds.push(
                q.answers[this._util.getRandomInt(0, 3)]._id
              );
        });
      });
      this._storage.store(this.KEY_TESTS, tests);
    }
    return tests;
  }

  public setTests(count: number): Test[] {
    const tests = [];
    for (let i = 0; i < count; i++) {
      tests.push(
        this.setTest(
          this._util.makeLorem(25, 'he'),
          this._auth.userValue,
          Date.now(),
          Math.random() > 0.5? 600 * this._util.getRandomInt(1, 9) : null,
          this.setQuestions(10)
        )
      );
    }
    return tests;
  }

  public setTest(
    title: string,
    createor: User,
    createdAt: number,
    timeLimt: number,
    questions: Question[]
  ): Test {
    return {
      _id: this._util.makeId(10),
      title,
      createor,
      createdAt,
      lastUpdatedAt: null,
      timeLimt,
      questions,
      activities: [],
      reviews: [],
      isPublish: true,
    };
  }

  public setQuestions(count: number): Question[] {
    const question = [];
    for (let i = 0; i < count; i++) {
      let isMultipleChoice = Math.random() > 0.8;
      question.push(
        this.setQuestion(
          isMultipleChoice,
          this._util.makeLorem(40, 'he'),
          this.setAnswers(isMultipleChoice ? 6 : 4),
          []
        )
      );
    }
    return question;
  }
  public setQuestion(
    isMultipleChoice: boolean,
    questionContent: string,
    answers: Answer[],
    correctAnswerIds: string[]
  ): Question {
    return {
      _id: this._util.makeId(10),
      isMultipleChoice,
      questionContent,
      answers,
      correctAnswerIds,
    };
  }

  public setAnswers(count: number): Answer[] {
    const answers = [];
    for (let i = 0; i < count; i++) {
      answers.push(this.setAnswer(this._util.makeLorem(45, 'he')));
    }
    return answers;
  }
  public setAnswer(answerContent: string): Answer {
    return {
      _id: this._util.makeId(10),
      answerContent,
    };
  }

  public query(filterBy?: FilterByTest): Observable<(Test | UserTest)[]> {
    // return of(this._tests)
    let tests = this._tests.map((test) => {
      let testUser = this._auth.userValue.tests.find((testUser) => {
        return testUser.testId === test._id;
      });
      return testUser ? testUser : test;
    });
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
    return of(tests);
  }
  public getById(testId: string): Observable<Test> {
    console.log(this._tests.length);

    return of(this._tests.find((test) => test._id === testId));
  }

  public saveTest(test: Test) {
    test._id ? this._updateTest(test) : this._addTest(test);
  }

  private _updateTest(currTest: Test) {
    const testIdx = this._tests.findIndex((test) => test._id === currTest._id);
    this._tests.splice(testIdx, 1, currTest);
    this._storage.store(this.KEY_TESTS, this._tests);
  }

  private _addTest(test: Test) {
    test._id = this._util.makeId(10);
    // todo: replace 2 line in backend
    test.createdAt = Date.now();
    test.createor = this._auth.userValue;
    this._tests.push(test);
    console.log(this._tests);

    this._storage.store(this.KEY_TESTS, this._tests);
  }

  public removeTest(testId) {
    const testIdx = this._tests.findIndex((test) => test._id === testId);
    this._tests.splice(testIdx, 1);
    this._storage.store(this.KEY_TESTS, this._tests);
  }

  public getEmptyTest(): Test {
    return {
      title: '',
      createor: null,
      createdAt: null,
      lastUpdatedAt: null,
      timeLimt: null,
      questions: [this.getEmptyQuestion()],
      reviews: [],
      activities: [],
      isPublish: true,
    };
  }
  
  public getEmptyUserTest(testId: string = null): UserTest {
    return {
      testId,
      title: '',
      timeLimt: null,
      timeLeft: null,
      questions: [],
      totalAnswered: 0,
      totalCorrectAnswered: 0,
      activeAt: null,
    };
  }

  public getEmptyQuestion(): Question {
    return {
      //todo: add answeredAt for analistics
      // answeredAt?: number,

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
