import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Test } from 'src/app/interfaces/test';
import { User } from 'src/app/interfaces/user';
import { UserQuestion } from 'src/app/interfaces/user-question';
import { UserTest } from 'src/app/interfaces/user-test';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TestService } from 'src/app/services/test/test.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss'],
})
export class TestDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _testService: TestService,
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  public test: Test;
  public user: User;
  public userTest: UserTest;

  public isTestChange: boolean = false;
  public isStartQuiz: boolean = false;

  ngOnInit(): void {
    this._loadTest();
  }

  // todo: replace at this._auth.userValue
  public get loggedinUser(): User {
    return this._authService.userValue;
  }

  private _getLoggedinUser() {
    return JSON.parse(JSON.stringify(this.loggedinUser));
  }

  private _loadTest(): void {
    const testId = this._route.snapshot.paramMap.get('id');
    if (testId) {
      this._testService.getById(testId).subscribe((test) => {
        if (!test) {
          //todo: add msg and transform to testService
          this._location.back();
        }
        this.test = test;
        this.user = this._getLoggedinUser();
        let userTest = this.user.tests.find(
          (userTest) => test._id === userTest.testId
        );
        if (!userTest) {
          userTest = this._BuildUserTest();
          this.user.tests.push(userTest);
          this.updateUser();
        }
        this.userTest = userTest;
      });
    }
  }

  public updateUser() {
    this._userService
      .updateUser(this.user)
      .pipe(first())
      .subscribe((userUpdated) => {
        // console.log(userUpdated, 'userUpdated in test details');
      });
  }

  public updateScore() {
    this.isTestChange = true;
    const userQuestionsAnswered = this.userTest.questions.filter(
      (q) => q.answeredIds.length
    );
    this.userTest.totalAnswered = userQuestionsAnswered.length;

    this.userTest.totalCorrectAnswered = userQuestionsAnswered.reduce(
      (acc, userQuestionAnswered) => acc + userQuestionAnswered.score,
      0
    );
  }

  public updateTime(currTimeLeft: number) {
    this.isTestChange = true;
    this.userTest.timeLeft = currTimeLeft;
  }

  private _updateTest(): void {
    if (this.userTest.totalAnswered) {
      this.userTest.activeAt = Date.now();
    }
    this.user = this._getLoggedinUser();
    const testIdx = this.user.tests.findIndex(
      (test) => test.testId === this.userTest.testId
    );
    this.user.tests.splice(testIdx, 1, this.userTest);
    this.updateUser();
  }

  public sendTest() {
    const { totalAnswered, questions } = this.userTest;
    let isSend = true;
    if (totalAnswered < questions.length) {
      isSend = confirm(
        `You have ${
          questions.length - totalAnswered
        } more answers to answer, do you still send?`
      );
    }
    if (isSend) {
      this._router.navigate([
        `/user/${this.user._id}/score/${this.userTest.testId}`,
      ]);
    }
  }

  public restartTest() {
    this.userTest = this._BuildUserTest(this.userTest.testId);
    this._updateTest();
  }

  private _BuildUserTest(testId: string = null): UserTest {
    const userTest = this._testService.getEmptyUserTest(testId);
    userTest.questions = this.test.questions.map((q) => ({
      questionId: q._id,
      answeredIds: [],
      score: 0,
      timePassed: 0,
    }));
    if (!testId) {
      userTest.testId = this.test._id 
    }
    userTest.title = this.test.title;
    userTest.timeLimt = this.test.timeLimt;
    userTest.timeLeft = this.test.timeLimt;
    console.log(userTest, 'userTest');
    
    return userTest;
  }

  ngOnDestroy(): void {
    if (this.isTestChange) {
      this._updateTest();
    }
  }
}
