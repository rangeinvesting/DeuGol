import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetGamesListComponent } from './bet-games-list.component';

describe('BetGamesListComponent', () => {
  let component: BetGamesListComponent;
  let fixture: ComponentFixture<BetGamesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetGamesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetGamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
