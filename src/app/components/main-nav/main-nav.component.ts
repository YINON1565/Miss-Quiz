import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  constructor(private _authService: AuthService) { }
  // public isLoggedinUser : boolean
  ngOnInit(): void {
    // this.isLoggedinUser = !!this._authService.getLoggeinUser()
  }

  
  public get isLoggedinUser() : boolean {
    return !!this._authService.getLoggeinUser()
  }
  

  public onLogout() : void{
    this._authService.logout()
  }

}
