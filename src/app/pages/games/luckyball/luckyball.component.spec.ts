import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckyballComponent } from './luckyball.component';

describe('LuckyballComponent', () => {
  let component: LuckyballComponent;
  let fixture: ComponentFixture<LuckyballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuckyballComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuckyballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
