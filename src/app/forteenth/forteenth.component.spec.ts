import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForteenthComponent } from './forteenth.component';

describe('ForteenthComponent', () => {
  let component: ForteenthComponent;
  let fixture: ComponentFixture<ForteenthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForteenthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForteenthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
