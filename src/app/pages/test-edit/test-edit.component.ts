// import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Test } from 'src/app/interfaces/test';
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
    private _route: ActivatedRoute,
    private _router: Router
  ) // private _location: Location
  {}

  ngOnInit(): void {
    //todo: add isAuth / Permissions
    this._loadTest();
  }

  public isTimeLimit: boolean = false;

  private _loadTest() {
    const testId = this._route.snapshot.paramMap.get('id');
    console.log(testId, 'testId');
    if (testId) {
      this._testService
        .getById(testId)
        .pipe(first())
        .subscribe((test) => {
          this.test = JSON.parse(JSON.stringify(test));
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
    this._testService.removeTest(this.test._id);
  }

  public clearTest() {
    window.scroll(0, 0);
    this._loadTest();
  }

  // public goBack(){
  //   this._location.back()
  // }
}
