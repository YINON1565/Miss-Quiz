import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Test } from 'src/app/interfaces/test';
import { TestService } from '../../services/test/test.service';
import { Subject } from 'rxjs';
import { TestFilterBy } from 'src/app/interfaces/test-filter-by';
import { AutocomplateOption } from 'src/app/interfaces/autocomplate-option';
@Component({
  selector: 'test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TestPageComponent implements OnInit {
  constructor(private testService: TestService) {
    this._loadTests.subscribe((_) => {
      this.testService.query(this.filterBy).subscribe((tests) => {
        this.tests = tests;
        this.options = this.tests.map((test) => ({
          link: `/test/${test._id}`,
          name: test.title,
        }));
      });
    });
  }
  private _loadTests = new Subject();

  public tests: Test[];
  public options: AutocomplateOption[];
  public filterBy: TestFilterBy = {
    term: '',
  };

  ngOnInit(): void {
    this._loadTests.next();
  }

  public onCheckedTest(testId: string): void {
    this.testService.getById(testId).subscribe();
  }

  public setFilter(filterBy: TestFilterBy) {
    this.filterBy = filterBy;
    this._loadTests.next();
  }
}
