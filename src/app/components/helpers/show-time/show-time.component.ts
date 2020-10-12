import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'show-time',
  templateUrl: './show-time.component.html',
  styleUrls: ['./show-time.component.scss'],
})
export class ShowTimeComponent implements OnInit {
  @Input() time: number;
  constructor(private _utilService: UtilService) {}
  public get timeForShow(): string {
    return (
      this._utilService.padNum(Math.floor(this.time / 60)) +
      ':' +
      this._utilService.padNum(this.time % 60)
    );
  }
  ngOnInit(): void {}
}
