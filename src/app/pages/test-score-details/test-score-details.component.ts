import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Test } from 'src/app/interfaces/test';
import { User } from 'src/app/interfaces/user';
import { UserTest } from 'src/app/interfaces/user-test';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChartService } from 'src/app/services/chart/chart.service';
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
    private _user: UserService,
    private _test: TestService,
    private _chart: ChartService,
    private _auth: AuthService
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
      this._user.getById(userId),
      this._test.getById(testId),
    ]).subscribe((results) => {
      this.test = results[1];
      this.user = results[0];
      this.userTest = this.user.tests.find((test) => test.testId === testId);
      this._setCharts();
      this.score = Math.round(
        (this.userTest.totalCorrectAnswered / this.userTest.questions.length) *
          100
      );
      this.scoreFromAnswered = Math.round(
        (this.userTest.totalCorrectAnswered / this.userTest.totalAnswered) * 100
      );
    });
  }

  public get loggedinUser(): User {
    return this._auth.userValue;
  }

  public get scoreAvarage(): number {
    return Math.floor(
      this.test.activities.reduce(
        (a, b) =>
          a + (b.totalCorrectAnswered / this.test.questions.length) * 100,
        0
      ) / this.test.activities.length
    );
  }

  public score: number;
  public scoreFromAnswered: number;

  public correctChart: any;
  public timetTestChart: any;
  public avarageScoreChart: any;

  private _setCharts() {
    const { totalAnswered, totalCorrectAnswered, questions } = this.userTest;

    this.correctChart = this._chart.getChart(
      'ניתוח פתרון המבחן',
      ['', ''],
      [
        ['תשובות נכונות', totalCorrectAnswered],
        ['תשובות שגויות', totalAnswered - totalCorrectAnswered],
        ['אין תשובות', questions.length - totalAnswered],
      ],
      'BarChart',
      '',
      '',
      null,
      null,
      [
        'BarChart',
        'PieChart',
        'ColumnChart',
        'ScatterChart',
        'SteppedAreaChart',
      ]
    );

    this.timetTestChart = this._chart.getChart(
      'היסטוריית התפלגות ציונים',
      ['זמן (בשניות)', 'מספר שאלה'],
      [...questions.map((q, i) => [i + 1, q.timePassed])],
      'SteppedAreaChart',
      'זמן (בשניות)',
      'מספר שאלה',
      0
    );

    this.avarageScoreChart = this._chart.getChart(
      'היסטוריית התפלגות ציונים',
      ['תאריך', 'ניקוד'],
      [
        ...this.test.activities.map((act, i) => [
          new Date(act.activeAt).toLocaleDateString(),
          (act.totalCorrectAnswered / questions.length) * 100,
        ]),
      ],
      'ScatterChart',
      'תאריך',
      'ניקוד',
      0,
      100
    );
  }
}
