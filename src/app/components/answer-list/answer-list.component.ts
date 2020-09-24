import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Answer } from 'src/app/interfaces/answer';

@Component({
  selector: 'answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
})
export class AnswerListComponent implements OnInit {
  @Input() answers: Answer[];
  @Input() answeredIdx: number;
  @Input() timeLeft: number;
  @Output() cheackedAnswer = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
  }
  public onCheackedAnswer(idx: number): void {
    this.timeLeft ? this.cheackedAnswer.emit(idx) : '';
  }
}
