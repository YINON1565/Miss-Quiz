import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCheckboxComponent } from './my-checkbox.component';

describe('MyCheckboxComponent', () => {
  let component: MyCheckboxComponent;
  let fixture: ComponentFixture<MyCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
