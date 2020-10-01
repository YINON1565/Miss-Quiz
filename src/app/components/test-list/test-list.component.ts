import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/interfaces/test';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent implements OnInit {
  @Input() tests: Test[];
  @Input() isTestsUser: boolean = false;
  // @Input() testsForShow: Test[];

  public get loggedinUser(): User {
    return this._authService.userValue;
  }

  constructor(private _route: ActivatedRoute, private _authService: AuthService) {}
  public userId: string;
  ngOnInit(): void {
    this.userId = this._route.snapshot.paramMap.get('id')
    // this._setTestForShow();
  }

  // private _setTestForShow() {
  //   // todo: Make the list up to date and reactive when returning from the test
  //   this.testsForShow = this.isTestsUser
  //     ? this.tests
  //     : // todo fine short code to do this
  //       this.tests.map((test) => {
  //         let testUser = this.loggedinUser.tests.find(
  //           (testUser) => testUser._id === test._id
  //         );
  //         return testUser ? testUser : test;
  //       });
  // }
}
