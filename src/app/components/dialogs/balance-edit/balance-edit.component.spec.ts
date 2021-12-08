import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceEditComponent } from './balance-edit.component';

describe('BalanceEditComponent', () => {
  let component: BalanceEditComponent;
  let fixture: ComponentFixture<BalanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
