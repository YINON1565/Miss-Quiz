import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/app/interfaces/test';

@Component({
  selector: 'test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],

})
export class TestListComponent implements OnInit {
@Input() tests: Test[];
  constructor() { }

  ngOnInit(): void {
  }

}
