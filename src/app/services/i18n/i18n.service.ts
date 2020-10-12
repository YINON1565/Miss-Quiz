import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  public toggleLang = new Subject();

  constructor() {
    this.toggleLang.pipe(debounceTime(400)).subscribe((_) => {
      this._toggleDir();
    });
  }
  private _toggleDir(): void {
    document.dir = document.dir === 'ltr' ? 'rtl' : 'ltr';
  }
}
