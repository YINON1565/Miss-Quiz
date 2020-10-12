import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'question-nav',
  templateUrl: './question-nav.component.html',
  styleUrls: ['./question-nav.component.scss']
})
export class QuestionNavComponent implements OnInit {
  @Input() questions: []
  @Input() currQuestionIdx : number
  @Output() emitChangeCurrQuestionIdx = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

}
