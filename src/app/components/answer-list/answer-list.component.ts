import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Answer } from 'src/app/interfaces/answer';

@Component({
  selector: 'answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
})
export class AnswerListComponent implements OnInit {
  @Input() answers: Answer[];
  @Input() answeredIds: string[];
  @Input() correctAnswerIds: string[];
  @Input() isActive: boolean;
  @Output() cheackedAnswer = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
  }

}
