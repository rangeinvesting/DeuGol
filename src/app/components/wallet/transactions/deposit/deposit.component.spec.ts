import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDepositComponent } from './deposit.component';

describe('TransactionDepositComponent', () => {
  let component: TransactionDepositComponent;
  let fixture: ComponentFixture<TransactionDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
