import { Location } from '@angular/common';
import {
  // ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SocketService } from './services/socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public connecteds: number;
  constructor(
    private _socket: SocketService,
    private _location: Location,
    // private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this._socket.setup();
    this._socket.on('updateConnecteds', this.changeConnected);
  }

  ngOnDestroy(): void {
    this._socket.off('updateConnecteds', this.changeConnected);
    this._socket.terminate();
  }

  changeConnected(connecteds: number): void {
    // Does not update 'this.connecteds', todo: fix it!
    console.log(connecteds, 'connecteds');

    this.connecteds = connecteds;
    //change detection
    // this.cdr.detectChanges();
  }

  public goBack() {
    this._location.back();
  }
  onActivate(event) {
    window.scroll(0, 0);
  }
}
