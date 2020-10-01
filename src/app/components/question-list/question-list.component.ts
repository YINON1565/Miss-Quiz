import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/interfaces/question';
import { UserQuestion } from 'src/app/interfaces/user-question';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  @Input() questions: Question[];
  @Input() userQuestions: UserQuestion[];
  @Input() isTimeLimit: boolean = false;
  @Input() isActive: boolean = false;
  @Output() updateScore = new EventEmitter();
  constructor() {}
  ngOnInit(): void {
    this._SetCurrQuestionIdx();
  }
  // public isAllQuestions: Boolean = false;
  // public get toggleIsAllQuestionsBtn(): string {
  //   return this.isAllQuestions ? 'צפה בכל תשובה בפני עצמה' : 'צפה בכל התשובות';
  // }
  // public toggleIsAllQuestions() {
  //   this.isAllQuestions = !this.isAllQuestions;
  //   if (this.isAllQuestions) {
  //     // todo: It does not work, fix it!!
  //     // this.currQuestionElement.nativeElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
  //   }
  // }

  public currQuestionIdx: number;
  public changeCurrQuestionIdx(diff: number): void {
    this.currQuestionIdx += diff;
  }
  
  private _SetCurrQuestionIdx() {
    const lastQuestionIdx = this.userQuestions.findIndex(
      (q) => q.answeredIds[0] === null
    );
    this.currQuestionIdx = lastQuestionIdx !== -1 ? lastQuestionIdx : 0;
  }
}
