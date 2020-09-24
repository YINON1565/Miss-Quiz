import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public padNum(num: number): number | string {
    return num > 9 ? num : '0' + num;
  }
}
