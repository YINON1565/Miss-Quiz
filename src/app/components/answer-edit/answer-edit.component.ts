import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from 'src/app/interfaces/answer';

@Component({
  selector: 'answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.scss']
})
export class AnswerEditComponent implements OnInit {
  @Input() answer : Answer;
  @Input() answerIdx : number;
  @Input() isMultipleChoice : boolean;
  @Input() correctAnswerIds : string[];
  @Output() removeAnswer = new EventEmitter<number>()
  @Output() onCheckedCorrect = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

  
  public get isCorrect() : boolean {
    return this.correctAnswerIds.includes(this.answer._id)
  }
  

}
