import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Test } from 'src/app/interfaces/test';
import { User } from 'src/app/interfaces/user';
import { TestService } from 'src/app/services/test/test.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss'],
})
export class TestDetailsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _testService: TestService,
    private _userService: UserService
  ) {}
  public test: Test;
  public user: User;
  public isStartQuiz: boolean = false;
  ngOnInit(): void {
    this._loadTest();
  }
  private _loadTest(): void {
    const testId = this._route.snapshot.paramMap.get('id');
    if (testId) {
      // var x = this._userService.loadUser().subscribe((user) => {
      //   let test = user.tests.find((test) => test._id === testId);
      //   if (test) {
      //     this.test = test;
      //   } else {
      //     this._testService
      //       .getById(testId)
      //       .pipe(tap((test) => this._userService.buildNewTest(test)))
      //       .subscribe((test) => (this.test = test));
      //   }
      //   this.user = user
      // });

      // this._testService.getById(testId).subscribe((test) => {
      //   this._userService.buildNewTest(test).subscribe((user) => {
      //     this.test = test;
      //     this.user = user;
      //   });
      // });
      this._testService.getById(testId).subscribe((test) => this.test = test);
    } else {
      // this.test = this.testService.getEmptyTest()
    }
  }
  public updateScore() {
    const answereds = this.test.questions.filter(
      (q) => q.answeredIdx || q.answeredIdx === 0
    );
    this.test.totalAnswered = answereds.length;
    this.test.totalCorrectAnswered = answereds.filter(
      (q) => q.isCorrectAnswered
    ).length;
  }
  public updateTime(currTimeLeft: number) {
    this.test.timeLeft = currTimeLeft;
  }
}
