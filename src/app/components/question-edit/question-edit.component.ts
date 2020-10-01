import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/interfaces/question';
import { TestService } from 'src/app/services/test/test.service';

@Component({
  selector: 'question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss'],
})
export class QuestionEditComponent implements OnInit {
  @Input() question: Question;
  @Output() removeQuestion = new EventEmitter<string>();
  constructor(private _testService: TestService) {}

  ngOnInit(): void {}

  public addAnswer() {
    this.question.answers.push(
      this._testService.getEmptyAnswer(
        `${this.question.answers.length + 1} example`
      )
    );
  }

  public removeAnswer(answerIdx: number) {
    this.question.answers.splice(answerIdx, 1);
  }

  public onToggleIsMultipleChoice(){
    this.question.isMultipleChoice? '' : this.question.correctAnswerIds = [] 
  }

  public checkedCorrect(answerId: string) {
    console.log(answerId, 'answerId');
    
    if (this.question.isMultipleChoice) {
      const answerIdx = this.question.correctAnswerIds.findIndex(
        (id) => id === answerId
      );
      answerIdx === -1
        ? this.question.correctAnswerIds.push(answerId)
        : this.question.correctAnswerIds.splice(answerIdx, 1);
    } else {
      this.question.correctAnswerIds.includes(answerId)
        ? (this.question.correctAnswerIds.splice(0, 1))
        : this.question.correctAnswerIds.splice(0, 1, answerId);
    }
    console.log(this.question.correctAnswerIds, 'this.question.correctAnswerIds');
    
  }
}
