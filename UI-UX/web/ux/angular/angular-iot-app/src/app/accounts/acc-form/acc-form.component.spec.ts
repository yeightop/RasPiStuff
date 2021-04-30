import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccFormComponent } from './acc-form.component';

describe('AccComponent', () => {
  let component: AccFormComponent;
  let fixture: ComponentFixture<AccFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
