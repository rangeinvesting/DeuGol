import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTicketsPageComponent } from './purchase-tickets-page.component';

describe('PurchaseTicketsPageComponent', () => {
  let component: PurchaseTicketsPageComponent;
  let fixture: ComponentFixture<PurchaseTicketsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseTicketsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseTicketsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
