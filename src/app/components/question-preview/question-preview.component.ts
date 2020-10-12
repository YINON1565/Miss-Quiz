import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Question } from 'src/app/interfaces/question';
import { UserQuestion } from 'src/app/interfaces/user-question';

@Component({
  selector: 'question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss'],
})
export class QuestionPreviewComponent implements OnInit, OnChanges {
  @Input() question: Question;
  @Input() userQuestion: UserQuestion;
  @Input() isTimeLimit: boolean;
  @Input() isActive: boolean;
  @Input() currQuestionIdx: number;
  @Input() questionsLength: number;
  @Output() updateScore = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: any): void {
    this._initializeTimePassed();
  }

  private _initializeTimePassed() {
    if (!this.userQuestion.timePassed) {
      this.userQuestion.timePassed = 0;
    }
  }

  public updateTime(currTimeLeft: number) {
    this.userQuestion.timePassed = currTimeLeft;
  }

  public cheackedAnswer(answerId: string): void {
    const { correctAnswerIds, isMultipleChoice } = this.question;
    const { answeredIds } = this.userQuestion;
    if (this.isTimeLimit || !this.isActive) return;
    if (isMultipleChoice) {
      // todo: limit check for correctAnswerIds.length
      const answeredIdx = answeredIds.findIndex((id) => id === answerId);
      answeredIdx === -1
        ? answeredIds.push(answerId)
        : answeredIds.splice(answeredIdx, 1);
    } else {
      answeredIds.includes(answerId)
        ? answeredIds.splice(0, 1)
        : answeredIds.splice(0, 1, answerId);
    }
    this.userQuestion.score =
      answeredIds.length >= 2 * correctAnswerIds.length
        ? 0
        : correctAnswerIds.reduce((sum, correctAnswerId) => {
            return answeredIds.includes(correctAnswerId)
              ? (sum = sum + 1)
              : sum;
          }, 0) /
            correctAnswerIds.length -
          (answeredIds.length > correctAnswerIds.length
            ? (answeredIds.length - correctAnswerIds.length) /
              correctAnswerIds.length
            : 0);
    this.updateScore.emit();
  }
}
