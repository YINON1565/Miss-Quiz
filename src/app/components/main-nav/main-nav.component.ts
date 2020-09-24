import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  constructor(private _authService: AuthService) { 
  }
  ngOnInit(): void {
  }
  
  public get isLoggedinUser() : boolean {
    return !!this._authService.userValue
  }

  public onLogout() : void{
    this._authService.logout()
  }

}
