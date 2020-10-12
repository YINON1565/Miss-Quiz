import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { ChartService } from 'src/app/services/chart/chart.service';
import { AutocomplateOption } from 'src/app/interfaces/autocomplate-option';
import { UserTest } from 'src/app/interfaces/user-test';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class UserDetailsComponent implements OnInit {
  public user: User;
  public timeTestsChart: any;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _chart: ChartService
  ) {}

  ngOnInit(): void {
    this._loadUser();
  }

  private _loadUser(): void {
    const userId = this._route.snapshot.paramMap.get('id');
    this._userService
      .getById(userId)
      .pipe(first())
      .subscribe((user) => {
        this.user = user;
        this._setChart();
      });
  }

  public filterBy = {
    term: '',
  };

  public isFocus: boolean = false;

  public get tests(): UserTest[] {
    return this.user.tests.filter((test) =>
      test.title.toLowerCase().includes(this.filterBy.term.toLowerCase())
    );
  }

  public get options(): AutocomplateOption[] {
    return this.tests.map((test) => ({
      link: test.totalAnswered? `/user/${this.user._id}/score/${test.testId}` :  `/test/${test.testId}`,
      name: test.title,
    }));
  }

  public setFilter(filterBy) {
    this.filterBy = filterBy;
  }

  private _setChart() {
    this.timeTestsChart = this._chart.getChart(
      'גרף תוצאות מבחנים שעשית',
      ['תאריך', 'ניקוד'],
      [
        ...this.user.tests
          .filter((t) => t.totalAnswered)
          .map((t, i) => [
            new Date(t.activeAt).toLocaleDateString(),
            (t.totalCorrectAnswered / t.questions.length) * 100,
          ]),
      ],
      'AreaChart',
      'תוצאה',
      'ניקוד',
      0,
      100
    );
  }
}
