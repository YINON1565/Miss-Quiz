import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserPageComponent implements OnInit {
  constructor(private _userService: UserService) {}
  public users: User[];
  ngOnInit(): void {
    this._loadUsers();
  }
  private _loadUsers() {
    this._userService
      .query()
      .pipe(first())
      .subscribe((users) => {
        this.users = users
      });
  }
}
