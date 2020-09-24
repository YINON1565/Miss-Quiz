import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Test } from 'src/app/interfaces/test';
import { TestService } from '../../services/test/test.service';
@Component({
  selector: 'test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TestPageComponent implements OnInit {
  constructor(private testService: TestService) {}
  public tests: Test[];
  ngOnInit(): void {
    this._loadTests()
  }
  
  private _loadTests() : void {
    this.testService.query().subscribe((tests) => (this.tests = tests));
  }

  public onCheckedTest(testId: string): void {
    this.testService.getById(testId).subscribe()
  }
}
