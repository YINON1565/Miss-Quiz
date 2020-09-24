import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/interfaces/answer';

@Component({
  selector: 'answer-preview',
  templateUrl: './answer-preview.component.html',
  styleUrls: ['./answer-preview.component.scss']
})
export class AnswerPreviewComponent implements OnInit {
@Input() answer: Answer;
@Input() idx: number;
@Input() idDisabled: boolean;
@Input() answeredIdx: number;
  constructor() { }

  
  public get isDisable() : boolean {
    return (this.answeredIdx || this.answeredIdx === 0) && this.answeredIdx !== this.idx
  }
  

  ngOnInit(): void {
  }

}
