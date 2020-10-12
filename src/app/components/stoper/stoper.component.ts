import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'stoper',
  templateUrl: './stoper.component.html',
  styleUrls: ['./stoper.component.scss']
})
export class StoperComponent implements OnInit {

  @Input() timePassed: number;
  @Output() updateTime = new EventEmitter<number>();
 
  constructor() {}

  ngOnInit(): void {
    this.observableStoper();
  }

  public observableStoper() {
    const source = timer(200, 1000);
    const subscription = source.subscribe((val) => {
      this.updateTime.emit(this.timePassed + 1);
    });
  }
}
