import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/app/interfaces/test';
import { UserTest } from 'src/app/interfaces/user-test';

@Component({
  selector: 'test-preview',
  templateUrl: './test-preview.component.html',
  styleUrls: ['./test-preview.component.scss'],
})
export class TestPreviewComponent implements OnInit {
  @Input() test: Test & UserTest;
  @Input() idx: number;

  ngOnInit(): void {
    this.score =
      Math.floor(
        (this.test.totalCorrectAnswered / this.test.totalAnswered) * 100
      ) + '%';
    // this.scoreAvarage =
    //   Math.floor(
    //     this.test.activities.reduce(
    //       (a, b) =>
    //         a + (b.totalCorrectAnswered / this.test.questions.length) * 100,
    //       0
    //     ) / this.test.activities.length
    //   ) + '%';
  }
  public score: string;
  // public scoreAvarage: string;
}
