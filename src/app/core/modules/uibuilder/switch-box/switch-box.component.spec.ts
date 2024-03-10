import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBoxComponent } from './switch-box.component';

describe('SwitchBoxComponent', () => {
  let component: SwitchBoxComponent;
  let fixture: ComponentFixture<SwitchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
