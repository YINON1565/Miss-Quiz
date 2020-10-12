import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountChildrenComponent } from './count-children.component';

describe('CountChildrenComponent', () => {
  let component: CountChildrenComponent;
  let fixture: ComponentFixture<CountChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
