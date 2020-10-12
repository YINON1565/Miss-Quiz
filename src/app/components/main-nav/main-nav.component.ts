import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { I18nService } from 'src/app/services/i18n/i18n.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  constructor(private _authService: AuthService, private _i18n: I18nService) {}
  ngOnInit(): void {}

  public get isLoggedinUser(): boolean {
    return !!this._authService.userValue;
  }

  public onLogout(): void {
    this._authService.logout();
  }
  public onToggleLang() {
    this._i18n.toggleLang.next();
  }

}
