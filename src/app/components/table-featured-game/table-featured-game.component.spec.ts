import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFeaturedGameComponent } from './table-featured-game.component';

describe('TableFeaturedGameComponent', () => {
  let component: TableFeaturedGameComponent;
  let fixture: ComponentFixture<TableFeaturedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFeaturedGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFeaturedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
