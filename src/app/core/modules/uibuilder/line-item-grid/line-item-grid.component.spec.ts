import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemGridComponent } from './line-item-grid.component';

describe('LineItemGridComponent', () => {
  let component: LineItemGridComponent;
  let fixture: ComponentFixture<LineItemGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineItemGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineItemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
