import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/app/interfaces/test';
import { UserTest } from 'src/app/interfaces/user-test';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'test-preview',
  templateUrl: './test-preview.component.html',
  styleUrls: ['./test-preview.component.scss'],
})
export class TestPreviewComponent implements OnInit {
  @Input() test: Test & UserTest;
  @Input() idx: number;

  constructor(private _utilService: UtilService) {}

  public timeForShow: string;
  ngOnInit(): void {
    if (this.test.testId && this.test.timeLimt) {
      this.timeForShow
        this._utilService.padNum(Math.floor(this.test.timeLeft / 60)) +
        ':' +
        this._utilService.padNum(this.test.timeLeft % 60);
    }
  }
}
