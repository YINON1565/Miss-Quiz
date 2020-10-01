import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestScoreDetailsComponent } from './test-score-details.component';

describe('TestScoreDetailsComponent', () => {
  let component: TestScoreDetailsComponent;
  let fixture: ComponentFixture<TestScoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestScoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestScoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
