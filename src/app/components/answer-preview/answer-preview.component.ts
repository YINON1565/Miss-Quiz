import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/interfaces/answer';

@Component({
  selector: 'answer-preview',
  templateUrl: './answer-preview.component.html',
  styleUrls: ['./answer-preview.component.scss'],
})
export class AnswerPreviewComponent implements OnInit {
  @Input() answer: Answer;
  @Input() idx: number;
  @Input() isActive: boolean;
  @Input() answeredIds: string[];
  @Input() correctAnswerIds: string[];
  constructor() {}

  ngOnInit(): void {}
}
