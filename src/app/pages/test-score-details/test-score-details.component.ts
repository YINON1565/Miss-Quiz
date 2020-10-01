import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Test } from 'src/app/interfaces/test';
import { User } from 'src/app/interfaces/user';
import { UserTest } from 'src/app/interfaces/user-test';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TestService } from 'src/app/services/test/test.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'test-score-details',
  templateUrl: './test-score-details.component.html',
  styleUrls: ['./test-score-details.component.scss'],
})
export class TestScoreDetailsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _testService: TestService,
    private _authService: AuthService
  ) {}

  @ViewChild('currQuestionElement') currQuestionElement: ElementRef;

  ngOnInit(): void {
    this._loadTest();
  }

  public test: Test;
  public userTest: UserTest;
  public user: User;

  private _loadTest() {
    const testId = this._route.snapshot.paramMap.get('t_id');
    const userId = this._route.snapshot.paramMap.get('u_id');

    forkJoin([
      this._userService.getById(userId),
      this._testService.getById(testId),
    ]).subscribe((results) => {
      this.test = results[1];
      this.user = results[0];
      this.userTest = this.user.tests.find((test) => test.testId === testId);
      this._setCharts();
      this.score = Math.round(
        (this.userTest.totalCorrectAnswered / this.userTest.questions.length) * 100
      );
      this.scoreFromAnswered = Math.round(
        (this.userTest.totalCorrectAnswered / this.userTest.totalAnswered) * 100
      );
    });
  }

  public get loggedinUser(): User {
    return this._authService.userValue;
  }

  public score: number;
  public scoreFromAnswered: number;

  public correctStatisticChart: any;
  public timetTestStatisticChart: any;

  private _setCharts() {
    const { totalAnswered, totalCorrectAnswered, questions } = this.userTest;

    this.correctStatisticChart = {
      chartTypes: [
        'BarChart',
        'PieChart',
        'ColumnChart',
        'ScatterChart',
        'SteppedAreaChart',
      ],
      type: 'BarChart',
      data: [
        ['תשובות נכונות', totalCorrectAnswered],
        ['תשובות שגויות', totalAnswered - totalCorrectAnswered],
        ['אין תשובות', questions.length - totalAnswered],
      ],
      columnNames: ['', ''],
      options: {
        title: 'ניתוח פתרון המבחן',
        is3D: true,
        slices: [
          { color: '#378ac5' },
          { color: '#125e94' },
          { color: '#7dbae6' },
        ],
        legend: 'none',
        animation: {
          duration: 1000,
          easing: 'liner',
          startup: true,
        },
      },
    };
    this.timetTestStatisticChart = {
      chartTypes: [
        'AreaChart',
        'LineChart',
        'ColumnChart',
        'ScatterChart',
        'SteppedAreaChart',
      ],
      type: 'SteppedAreaChart',
      data: [...questions.map((q, i) => [i + 1, q.timePassed])],
      columnNames: ['זמן (בשניות)', 'מספר שאלה'],
      options: {
        title: 'כמה זמן לקח לכל שאלה',
        // colors: ['red'],
        animation: { duration: 1000, easing: 'liner', startup: true },
        legend: 'none',
        vAxis: {
          title: 'זמן (בשניות)',
          titleTextStyle: { fontSize: 18 },
        },
        hAxis: {
          title: 'מספר שאלה',
          titleTextStyle: { fontSize: 18 },
        },
      },
    };
  }
}
