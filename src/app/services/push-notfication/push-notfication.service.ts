import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/helpers/snack-bar/snack-bar.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { DialogComponent } from 'src/app/components/helpers/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PushNotficationService {
  constructor(private _snackBar: MatSnackBar, private _dialog: MatDialog) {
    this.toggleLoading.subscribe((_) => {
      this.isLoading.next(!this.isLoading.value);
    });
  }

  public toggleLoading = new Subject();
  public isLoading = new BehaviorSubject<boolean>(false);

  public openSnackBar(
    msg: string,
    panelClass: string = 'info',
    duration: number = 3500
  ): MatSnackBarRef<SnackBarComponent> {
    return this._snackBar.openFromComponent(SnackBarComponent, {
      data: msg,
      duration,
      panelClass: ['mat-notfication', panelClass],
    });
  }

  public openDialog(data: {
    message: string;
    buttonText: { ok: string; cancel: string };
  }): MatDialogRef<DialogComponent, any> {
    return this._dialog.open(DialogComponent, { data });
  }
}
