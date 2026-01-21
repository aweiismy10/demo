import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxDemoComponent } from './checkbox-demo.component';

describe('EighteenthComponent', () => {
  let component: CheckboxDemoComponent;
  let fixture: ComponentFixture<CheckboxDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
