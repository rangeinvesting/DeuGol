import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckyballFeaturedComponent } from './featured.component';

describe('LuckyballFeaturedComponent', () => {
  let component: LuckyballFeaturedComponent;
  let fixture: ComponentFixture<LuckyballFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuckyballFeaturedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuckyballFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
