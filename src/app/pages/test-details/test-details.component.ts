import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Test } from 'src/app/interfaces/test';
import { TestActivity } from 'src/app/interfaces/test-activity';
import { User } from 'src/app/interfaces/user';
import { UserTest } from 'src/app/interfaces/user-test';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PushNotficationService } from 'src/app/services/push-notfication/push-notfication.service';
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
    private _authService: AuthService,
    private _pushNotfication: PushNotficationService
  ) {}

  public onToggleLoading() {
    this._pushNotfication.toggleLoading.next();
  }

  public test: Test;
  public user: User;
  public userTest: UserTest;

  public isTestChange: boolean = false;
  public isStartQuiz: boolean = true;
  // public isStartQuiz: boolean = false;

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
      .subscribe((userUpdated) => {});
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

  private _dataUpdate(): void {
    if (this.userTest.totalAnswered) {
      this.userTest.activeAt = Date.now();
    }
    this.user = this._getLoggedinUser();
    const testIdx = this.user.tests.findIndex(
      (test) => test.testId === this.userTest.testId
    );
    this.user.tests.splice(testIdx, 1, this.userTest);
    this.updateUser();

    this._updateTest();
  }

  public sendTest() {
    const { totalAnswered, questions } = this.userTest;
    if (totalAnswered < questions.length) {
      this._pushNotfication
        .openDialog({
          message: `נשארו עדיין ${
            questions.length - totalAnswered
          } שאלות ללא מענה, האם בכל זאת להמשיך?`,
          buttonText: {
            ok: 'כן, להמשיך',
            cancel: 'לחזור למבחן',
          },
        })
        .afterClosed()
        .subscribe((confirmed: boolean) => {
          if (confirmed) {
            this._goScorePage();
          }
        });
    } else {
      this._goScorePage();
    }
  }

  private _goScorePage() {
    const snackBarRef = this._pushNotfication.openSnackBar(
      'המבחן הוגש בהצלחה, מיד תועבר לתוצאות'
    );
    this._pushNotfication.toggleLoading.next()
    setTimeout(() => {
      snackBarRef.dismiss();
      this._router.navigate([
        `/user/${this.user._id}/score/${this.userTest.testId}`,
      ]);
      this._pushNotfication.toggleLoading.next()
    }, 1000);
  }

  public restartTest() {
    this.userTest = this._BuildUserTest(this.userTest.testId);
    this._dataUpdate();
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
      userTest.testId = this.test._id;
    }
    userTest.title = this.test.title;
    userTest.timeLimit = this.test.timeLimit;
    userTest.timeLeft = this.test.timeLimit;
    return userTest;
  }

  private _updateTest() {
    const { activities } = this.test;
    const activity: TestActivity = this._buildTestActivity();
    const activityIdx = activities.findIndex((activity) => {
      return activity.userId === this.user._id;
    });
    activityIdx === -1
      ? activities.push(activity)
      : activities.splice(activityIdx, 1, activity);
    this._testService.saveTest(this.test).subscribe((updatedTest) => {});
  }

  private _buildTestActivity(): TestActivity {
    return {
      testId: this.test._id,
      userId: this.user._id,
      activeAt: Date.now(),
      totalAnswered: this.userTest.totalAnswered,
      totalCorrectAnswered: this.userTest.totalCorrectAnswered,
    };
  }

  ngOnDestroy(): void {
    if (this.isTestChange) {
      this._dataUpdate();
    }
  }
}
