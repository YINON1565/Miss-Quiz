import { Component, OnInit } from '@angular/core';
import { PushNotficationService } from 'src/app/services/push-notfication/push-notfication.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  constructor(private _push: PushNotficationService) {
    this._push.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }
  public isLoading: boolean = false;

  ngOnInit(): void {}
}
