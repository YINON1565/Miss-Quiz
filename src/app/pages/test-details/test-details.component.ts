import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
// import { tap } from 'rxjs/operators';
import { Test } from 'src/app/interfaces/test';
import { User } from 'src/app/interfaces/user';
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
    private _testService: TestService,
    private _userService: UserService,
    private _authService: AuthService
  ) {}
  public test: Test;
  public user: User;
  // public loggedinUser: User;
  public isStartQuiz: boolean = false;
public countUpdateUser = 0
  ngOnInit(): void {
    this._loadTest();
  }

  public get loggedinUser(): User {
    return this._authService.userValue;
  }

  private _loadCurrLoggedinUser() {
    return JSON.parse(JSON.stringify(this.loggedinUser));
  }

  private _loadTest(): void {
    const testId = this._route.snapshot.paramMap.get('id');
    if (testId) {
      this._testService.getById(testId).subscribe((newTest) => {
        this.user = this._loadCurrLoggedinUser();
        let test = this.user.tests.find((test) => test._id === newTest._id);
        if (test) {
          this.test = test;
        } else {
          this.user.tests.push(newTest);
          this.test = newTest;
          this.updateUser();
        }
      });
    } else {
      // this.test = this.testService.getEmptyTest()
    }
  }
  public updateUser() {
    this.countUpdateUser++
    console.log(this.user.tests, 'tests of loggedinUser prev update');
    this._userService
      .updateUser(this.user)
      .pipe(first())
      .subscribe((userUpdated) => {
        // this.loggedinUser = userUpdated
        console.log(userUpdated, 'userUpdated in test details');
      });
  }

  public updateScore() {
    const answereds = this.test.questions.filter(
      (q) => q.answeredIdx || q.answeredIdx === 0
    );
    this.test.totalAnswered = answereds.length;
    this.test.totalCorrectAnswered = answereds.filter(
      (q) => q.isCorrectAnswered
    ).length;
    // this._updateTest();
  }
  
  public updateTime(currTimeLeft: number) {
    this.test.timeLeft = currTimeLeft;
    // this._updateTest();
  }

  private _updateTest(): void {
    this.user = this._loadCurrLoggedinUser();
    const testIdx = this.user.tests.findIndex(
      (test) => test._id === this.test._id
    );
    this.user.tests.splice(testIdx, 1, this.test);
    this.updateUser();
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._updateTest()
  }
}
