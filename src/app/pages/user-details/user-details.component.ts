import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailsComponent implements OnInit {

  public user: User;

  constructor(private _userService : UserService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._loadUser()
  }

  private _loadUser(): void {
    const userId = this._route.snapshot.paramMap.get('id')
    this._userService.getById(userId).pipe(first()).subscribe(user=> {
      this.user = user
    })
  }

}
