import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() timeLeft: number;
  @Output() updateTime = new EventEmitter<number>();
  public isNeerTheEnd: boolean = false;
 
  constructor() {}

  ngOnInit(): void {
    this.observableTimer();
  }

  public observableTimer() {
    if (this.timeLeft <=0) {
      this.isNeerTheEnd = true
      return
    }
    const source = timer(200, 1000);
    const subscription = source.subscribe((val) => {
      if (!this.isNeerTheEnd && this.timeLeft < 30) {
        this.isNeerTheEnd = true
      }
      if (this.timeLeft <= 1) {
        subscription.unsubscribe();
      }
      this.updateTime.emit(this.timeLeft - 1);
    });
  }
}
