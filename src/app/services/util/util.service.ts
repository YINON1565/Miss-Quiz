import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  public padNum(num: number): number | string {
    return num > 9 ? num : '0' + num;
  }

  public makeId(length: number = 5): string {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  public makeLorem(length: number, lang: string = 'en') {
    var randStr = '';
    while (randStr.length < length) {
      var wordLength = this.getRandomInt(3, 6);
      var word = this._createWord(wordLength, lang);

      if (Math.random() > 0.9) word += ',';

      randStr += word + ' ';
    }
    randStr = randStr.substring(0, length);
    randStr = randStr[0].toUpperCase() + randStr.substr(1);

    return randStr;
  }

  private _getRandChar(lang: string) {
    var LETTERS =
      lang === 'he'
        ? 'אבגדהוזחטיכלמנסעפצקרשתםןץףך'
        : 'abcdefghijklmnopqrstuvwxyz';
    var randIndex = parseInt((Math.random() * LETTERS.length).toString());
    return LETTERS.charAt(randIndex);
  }

  private _createWord(length, lang) {
    var word = '';
    while (word.length < length) {
      var randChar = this._getRandChar(lang);
      word += randChar;
    }

    return word;
  }

  public getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
}
