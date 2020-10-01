import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Test } from 'src/app/interfaces/test';
import { TestService } from '../../services/test/test.service';
import { FilterByTest } from '../../interfaces/filter-by-test';
import { UserTest } from 'src/app/interfaces/user-test';
@Component({
  selector: 'test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TestPageComponent implements OnInit {
  constructor(private testService: TestService) {}
  public tests: (Test | UserTest)[];
  public filterBy: FilterByTest;

  public selectOptions = [
    { value: null, name: 'ללא' },
    { value: 'visit', name: 'Visit Only' },
    { value: 'active', name: 'Active' },
  ];
  ngOnInit(): void {
    this.filterBy = { type: 'active', isSort: true };
    this._loadTests();
  }

  private _loadTests(): void {
    this.testService
      .query(this.filterBy)
      .subscribe((tests) => (this.tests = tests));
  }

  public onCheckedTest(testId: string): void {
    this.testService.getById(testId).subscribe();
  }

  public onSelected() {
    this._loadTests();
  }
}
