import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PushNotficationService } from 'src/app/services/push-notfication/push-notfication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _push: PushNotficationService,
    private _router: Router
  ) {}

  //CREATED
  ngOnInit(): void {
    this._loadUser();
    this._authService.userValue ? this._router.navigate(['/']): ''
  }

  //STATE
  private _user: User;
  private _regPassword: RegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  private _regEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

  public registerForm: FormGroup;
  public loginForm: FormGroup;
  public hide: boolean = true;
  public isSignup: boolean = true;

  
  public get toggleIsSignUpBtnText() : string {
    return this.isSignup? 'יש לך חשבון? התחבר עכשיו' : 'אינך רשום עדיין? הרשם עכשיו'
  }
  

  //COMPUTED
  public get getErrorMessage(): string {
    if (this.registerForm.value.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.value.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  //METHODS
  private _loadUser(): void {
    this._user = this._authService.getEmptyUser();
    this._buildForm(this._user);
  }

  private _buildForm(user: User) {
    this.registerForm = new FormGroup({
      name: new FormControl(user.name, Validators.minLength(2)),
      email: new FormControl(user.email, [Validators.email, Validators.pattern(this._regEmail) ]),
      password: new FormControl(user.password, [ Validators.minLength(8), Validators.pattern(this._regPassword)]),
    });
    this.loginForm = new FormGroup({
      email: new FormControl(user.email, Validators.email),
      password: new FormControl(user.password, Validators.minLength(8)),
    });
  }

  
  public get formGroup() : FormGroup {
    return this.isSignup? this.registerForm : this.loginForm;
  }
  

  public getError(el) {
    const fromControl = this.formGroup.get(el)
    switch (el) {
      case 'name':
        if (fromControl.hasError('required')) {
          return 'שדה חובה';
        } else if (fromControl.hasError('minlength')){
          return 'שם חייב להכיל לפחות שני תווים'
        }
        break;
      case 'email':
        if (fromControl.hasError('required')) {
          return 'שדה חובה';
        } else if (fromControl.hasError('email') || fromControl.hasError('pattern')) {
          return 'מייל לא חוקי';
        }
        break;
      case 'password':
        if (fromControl.hasError('required')) {
          return 'שדה חובה';
        } else if (fromControl.hasError('minlength')){
          return 'סיסמא חייבת להכיל לפחות 8 תווים'
        } else if (fromControl.hasError('pattern')){
          return 'סיסמא צריכה להכיל אותיות גדולות וקטנות (באנגלית) ומספרים'
        }
        break;
      default:
        return '';
    }
  }

  public onSubmit(NgForm: NgForm): void {
    const isValid = this.isSignup? this.registerForm.valid : this.loginForm.valid 
    if (isValid) {
      this._push.toggleLoading.next()
      this.isSignup? this._signup(): this._login();
    } else {
      this._handleError() 
    }
  }

  private _signup(): void {
    const { name, email, password } = this.registerForm.value;
    this._authService
      .signup({ ...this._user, name, email, password })
      .subscribe((userRegistered) => {
        userRegistered
          ? this._handleSuccess('userRegistered', userRegistered)
          : this._handleError();
      });
  }

  private _login() {
    this._authService
      .login(this.loginForm.value)
      .subscribe((userLogged) => {
        userLogged
          ? this._handleSuccess('userLogged', userLogged)
          : this._handleError();
      });
  }

  private _handleError(): void {
    this._push.toggleLoading.next()
  }
  
  private _handleSuccess(type: string, user?: User): void {
    this._push.toggleLoading.next()
    switch (type) {
      case 'userRegistered':
        this._router.navigate(['/']);
        break;
      case 'userLogged':
        this._router.navigate(['/']);
        break;
    }
    // Todo: add massage
  }
}
