import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss'],
})
export class QuestionPreviewComponent implements OnInit {
  @Input() question: Question;
  @Input() timeLeft: number;
  @Output() updateScore = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  public cheackedAnswer(idx: number): void {
    this.question.answeredIdx =
      this.question.answeredIdx === idx ? null : idx;
    this.question.isCorrectAnswered = this.question.isCorrectAnswered
      ? false
      : this.question.answers[idx].isCorrect
      ? true
      : false;
    this.updateScore.emit();
  }
}
