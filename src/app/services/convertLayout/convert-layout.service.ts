import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConvertLayoutService {
  constructor() {}
  
  private heReg = new RegExp(/[\u0590-\u05FF]/);

  public covertor(str: string): string {
    return this.heReg.test(str.charAt(0))
      ? this._fromHeToEn(str)
      : this._fromEnToHe(str.toLowerCase());
  }

  private _fromHeToEn(str: string) {
    return str
      .split('')
      .map((letter) =>
        this._heLetter[letter] ? this._heLetter[letter] : letter
      )
      .join('');
  }
  private _fromEnToHe(str: string) {
    return str
      .split('')
      .map((letter) =>
        this._enLetter[letter] ? this._enLetter[letter] : letter
      )
      .join('');
  }

  private _heLetter = {
    א: 't',
    ב: 'c',
    ג: 'd',
    ד: 's',
    ה: 'v',
    ו: 'u',
    ז: 'z',
    ח: 'j',
    ט: 'y',
    י: 'h',
    כ: 'f',
    ך: 'l',
    ל: 'k',
    מ: 'n',
    ם: 'o',
    נ: 'b',
    ן: 'i',
    ס: 'x',
    ע: 'g',
    פ: 'p',
    ף: ';',
    צ: 'm',
    ץ: '.',
    ק: 'e',
    ר: 'r',
    ש: 'a',
    ת: ',',
    '/': 'q',
    ',': "'",
    '.': '/',
    "'": 'w',
  };
  private _enLetter = {
    q: '/',
    w: "'",
    e: 'ק',
    r: 'ר',
    t: 'א',
    y: 'ט',
    u: 'ו',
    i: 'ן',
    o: 'ם',
    p: 'פ',
    a: 'ש',
    s: 'ד',
    d: 'ג',
    f: 'כ',
    g: 'ע',
    h: 'י',
    j: 'ח',
    k: 'ל',
    l: 'ך',
    ';': 'ף',
    "'": ',',
    z: 'ז',
    x: 'ס',
    c: 'ב',
    v: 'ה',
    b: 'נ',
    n: 'מ',
    m: 'צ',
    ',': 'ת',
    '.': 'ץ',
    '/': '.',
  };
}
