import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
@Input() questions: Question[];
@Input() timeLeft: number;
@Output() updateScore = new EventEmitter();


public currQuestionIdx : number;
  constructor() { }

public changeCurrQuestionIdx(diff): void {
  this.currQuestionIdx += diff; 
}


  ngOnInit(): void {
    this.currQuestionIdx = 0
  }

}
