import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangingValueComponent } from './changing-value.component';

describe('ChangingValueComponent', () => {
  let component: ChangingValueComponent;
  let fixture: ComponentFixture<ChangingValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangingValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangingValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
