import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/app/interfaces/test';

@Component({
  selector: 'test-preview',
  templateUrl: './test-preview.component.html',
  styleUrls: ['./test-preview.component.scss'],

})
export class TestPreviewComponent implements OnInit {
@Input() test: Test;
@Input() idx: number;
  constructor() { }

  ngOnInit(): void {
  }

}
