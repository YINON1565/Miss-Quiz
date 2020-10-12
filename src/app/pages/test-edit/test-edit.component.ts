import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from 'src/app/interfaces/test';
// import { MockTestService } from 'src/app/services/mock-test/mock-test.service';
import { TestService } from 'src/app/services/test/test.service';

@Component({
  selector: 'test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.scss'],
})
export class TestEditComponent implements OnInit {
  public test: Test;
  constructor(
    private _testService: TestService,
    // private _mockTest: MockTestService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    //todo: add isAuth / Permissions
    this._loadTest();
  }

  public currQuestionIdx: number = 0;
  public changeCurrQuestionIdx(diff: number): void {
    this.currQuestionIdx += diff;
  }

  public isTimeLimit: boolean = false;
  // public onInputTextArea(ev) {
  //   this.test.questions = this._mockTest.getTestFromTestStr(ev.target.value);
  // }

  private _loadTest() {
    const testId = this._route.snapshot.paramMap.get('id');
    if (testId) {
      this._testService.getById(testId).subscribe((test) => {
        if (test) {
          this.test = JSON.parse(JSON.stringify(test));
        } else {
          this._router.navigate(['/test/edit'])
        }
      });
    } else {
      this.test = this._testService.getEmptyTest();
    }
  }

  public addQuestion() {
    this.test.questions.push(this._testService.getEmptyQuestion());
  }

  public removeQuestion(questionId: string) {
    const questionIdx = this.test.questions.findIndex(
      (q) => q._id === questionId
    );
    this.test.questions.splice(questionIdx, 1);
  }

  public saveTest() {
    this._testService.saveTest(this.test).subscribe();
    this._router.navigate(['/test']);
  }

  public removeTest() {
    // todo: remove it from all users?
    // todo: add confirm
    this._testService.removeTest(this.test._id).subscribe();
  }

  public clearTest() {
    window.scroll(0, 0);
    this._loadTest();
  }
}
