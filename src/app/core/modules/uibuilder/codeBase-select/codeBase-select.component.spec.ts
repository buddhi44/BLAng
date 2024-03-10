import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeBaseSelectComponent } from './codeBase-select.component';

describe('AddressSelectComponent', () => {
    let component: CodeBaseSelectComponent;
    let fixture: ComponentFixture<CodeBaseSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [CodeBaseSelectComponent ]
    })
    .compileComponents();

      fixture = TestBed.createComponent(CodeBaseSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
