import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _socket: SocketIOClient.Socket;
  constructor(private _storageService: StorageService) {
    // this._socket = io(BASE_URL);
  }

  private BASE_URL = environment.production ? '/' : '//localhost:3030/' ;

  public setup() {
    this._socket = io(this.BASE_URL);
  }

  public terminate() {
    this._socket = null;
  }

  public on(eventName, cb) {
    this._socket.on(eventName, cb);
  }

  public off(eventName, cb) {
    this._socket.off(eventName, cb);
  }

  public emit(eventName, data = null) {
    console.log(eventName, 'eventName');
    console.log(data, 'data');
    console.log(this._socket, 'this._socket');
    
    
    this._socket.emit(eventName, data);
  }
}

// function loadMsg(topic){
//     return storageService.load(topic)
// }
// function pushMsg(msg){
//     var msgs = storageService.load(msg.topic)
//     msgs ? msgs.push(msg): msgs = [msg]
//     storageService.store(msg.topic, msgs)
//     return msgs;
// }
