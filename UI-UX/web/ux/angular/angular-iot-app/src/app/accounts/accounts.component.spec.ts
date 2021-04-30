import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccComponent } from './accounts.component';

describe('HomeComponent', () => {
  let component: AccComponent;
  let fixture: ComponentFixture<AccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
