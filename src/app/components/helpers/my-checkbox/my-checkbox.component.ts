import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'my-checkbox',
  templateUrl: './my-checkbox.component.html',
  styleUrls: ['./my-checkbox.component.scss']
})
export class MyCheckboxComponent implements OnInit {
@Input() isChecked: boolean
@Input() isDisabled: boolean
  constructor() { }

  ngOnInit(): void {
  }

}
