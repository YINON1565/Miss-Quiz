import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AutocomplateOption } from 'src/app/interfaces/autocomplate-option';
import { TestFilterBy } from 'src/app/interfaces/test-filter-by';
import { ConvertLayoutService } from 'src/app/services/convertLayout/convert-layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'test-filter',
  templateUrl: './test-filter.component.html',
  styleUrls: ['./test-filter.component.scss'],
})
export class TestFilterComponent implements OnInit, OnDestroy {
  @Input() filterBy: TestFilterBy;
  @Input() options: AutocomplateOption[];
  @Input() placeholder: string;
  @Input() label: string;
  @Output() emitFilter = new EventEmitter<TestFilterBy>();
  @Output() toggleFocus = new EventEmitter();

  private prevTerm: string = '';
  public searchControl: FormControl;
  private _subscription: Subscription;

  constructor(
    private _convertLayout: ConvertLayoutService,
    private _router: Router
  ) {}
  
  public onOptionSelected(link: string) {
    this._router.navigate([link]);
  }

  ngOnInit() {
    this.searchControl = new FormControl(this.filterBy.term);
    this._subscription = this.searchControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((_) => {
        if (
          (this.filterBy.term || this.filterBy.term === this.prevTerm) &&
          (!this.filterBy.term.trim() ||
            this.prevTerm.trim() === this.filterBy.term.trim())
        ) {
          return;
        }
        this.filterBy.conversionTerm = this._convertLayout.covertor(
          this.filterBy.term
        );
        this.emitFilter.emit(this.filterBy);
        this.prevTerm = this.filterBy.term;
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
