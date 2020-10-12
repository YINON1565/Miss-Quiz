import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'count-children',
  templateUrl: './count-children.component.html',
  styleUrls: ['./count-children.component.scss']
})
export class CountChildrenComponent implements OnInit {
@Input () countChildren : number;
public numbers : any
  constructor() {
  }
  
  ngOnInit(): void {
    this.numbers = Array(this.countChildren).fill(0).map((x,i)=>({value: i}))
  }

}
