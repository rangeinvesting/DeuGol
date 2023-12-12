import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionWithdrawComponent } from './withdraw.component';

describe('TransactionWithdrawComponent', () => {
  let component: TransactionWithdrawComponent;
  let fixture: ComponentFixture<TransactionWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionWithdrawComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
