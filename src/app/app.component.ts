import { Location } from '@angular/common';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
// import { SocketService } from './services/socket/socket.service';
import { UtilService } from './services/util/util.service';

@Component({
  selector: 'app-root body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public connecteds: number;
  constructor(
    // private _socket: SocketService,
    private _location: Location,
    private _util: UtilService
  ) {
    document.dir = 'rtl';
  }

  public randomColor: string = '#E27240';
  public subscriptionBgc: Subscription;
  public getRandomColor() {
    this.randomColor = this._util.getRandomSpecificColor(
      '#E27240',
      3,
      '123456789'.split('')
    );
  }
  public observableBgc() {
    const source = timer(0, 2000);
    this.subscriptionBgc = source.subscribe((_) => {
      this.getRandomColor();
    });
  }
  @HostBinding('style.background-color') get backgroundColor() {
    return this.randomColor;
  }

  ngOnInit(): void {
    this.observableBgc();

    // this._socket.setup();
    // this._socket.on('updateConnecteds', this.changeConnected);
  }

  ngOnDestroy(): void {
    this.subscriptionBgc.unsubscribe();
    // this._socket.off('updateConnecteds', this.changeConnected);
    // this._socket.terminate();
  }

  // changeConnected(connecteds: number): void {
  //   // Does not update 'this.connecteds', todo: fix it!
  //   console.log(connecteds, 'connecteds');

  //   this.connecteds = connecteds;
  // }

  public goBack() {
    this._location.back();
  }
  onActivate(event) {
    window.scroll(0, 0);
  }
}
