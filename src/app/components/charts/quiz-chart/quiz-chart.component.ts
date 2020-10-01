import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'src/app/interfaces/chart';

@Component({
  selector: 'quiz-chart',
  templateUrl: './quiz-chart.component.html',
  styleUrls: ['./quiz-chart.component.scss'],
})
export class QuizChartComponent implements OnInit {
  @Input() chart: any;
  public typeDynamic: string;
  public isReady: boolean = false;

  constructor() {}
  ngOnInit(): void {
    this.typeDynamic = this.chart.type;
  }

}
