import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { AutocomplateOption } from 'src/app/interfaces/autocomplate-option';
import { User } from 'src/app/interfaces/user';
import { UserFilterBy } from 'src/app/interfaces/user-filter-by';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserPageComponent implements OnInit {
  public users: User[];
  public options : AutocomplateOption[]

  private _loadUsers = new Subject();
  constructor(private _userService: UserService) {
    this._loadUsers.subscribe((_) =>
      this._userService
        .query(this.filterBy)
        .subscribe((users) => {
          this.users = users
          this.options = this.users.filter((_,i)=>i<5).map(user=>({link: `/user/${user._id}`, name: user.name}))
        })
    );
  }

  public filterBy: UserFilterBy = {
    term: '',
  };

  public setFilter(filterBy: UserFilterBy) {
    this.filterBy = filterBy;
    this._loadUsers.next();
  }

  ngOnInit(): void {
    this._loadUsers.next();
  }
}
