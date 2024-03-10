import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreUiRendereComponent } from './core-ui-rendere.component';

describe('CoreUiRendereComponent', () => {
  let component: CoreUiRendereComponent;
  let fixture: ComponentFixture<CoreUiRendereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreUiRendereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreUiRendereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
