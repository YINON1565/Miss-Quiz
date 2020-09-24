import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public load(key: string): any {
    var val: any = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  }

  public store(key: string, val: any): void {
    localStorage[key] = JSON.stringify(val);
  }

  public loadSession(key: string): any {
    var val: any = sessionStorage.getItem(key)
    return (val)? JSON.parse(val) : null;
}

  public storeSession(key: string, val: any): void {
    sessionStorage[key] = JSON.stringify(val);
  }
}
