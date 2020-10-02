import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailsComponent implements OnInit {
  public user: User;
  public timetTestsStatisticChart: any;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute
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
        this._setChart()
      });
  }


  private _setChart() {
    this.timetTestsStatisticChart = {
      chartTypes: [
        'AreaChart',
        'LineChart',
        'ColumnChart',
        'ScatterChart',
        'SteppedAreaChart',
      ],
      type: 'AreaChart',
      data: [...this.user.tests.filter(t=> t.totalAnswered).map((t, i) => [new Date(t.activeAt).toLocaleDateString(), t.totalCorrectAnswered * 10])],
      columnNames: ['DATE', 'SCORE'],
      options: {
        title: 'גרף תוצאות מבחנים שעשית',
        // colors: ['red'],
        animation: { duration: 1000, easing: 'liner', startup: true },
        legend: 'none',
        vAxis: {
          title: 'תוצאה',
          titleTextStyle: { fontSize: 18 },
        },
        hAxis: {
          title: 'תאריך',
          titleTextStyle: { fontSize: 18 },
        },
      },
    };
  }
}
