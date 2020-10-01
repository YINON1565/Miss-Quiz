import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'stoper',
  templateUrl: './stoper.component.html',
  styleUrls: ['./stoper.component.scss']
})
export class StoperComponent implements OnInit {

  @Input() timePassed: number;
  @Output() updateTime = new EventEmitter<number>();
 
  constructor(private _utilService : UtilService) {}

  public get timeForShow(): string {
    return this._utilService.padNum(Math.floor(this.timePassed / 60)) + ':' +  this._utilService.padNum(this.timePassed % 60);
  }
  
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
