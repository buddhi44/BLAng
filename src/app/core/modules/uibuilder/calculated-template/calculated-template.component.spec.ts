import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatedTemplateComponent } from './calculated-template.component';

describe('CalculatedTemplateComponent', () => {
  let component: CalculatedTemplateComponent;
  let fixture: ComponentFixture<CalculatedTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatedTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatedTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
