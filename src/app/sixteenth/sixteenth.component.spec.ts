import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixteenthComponent } from './sixteenth.component';

describe('SixteenthComponent', () => {
  let component: SixteenthComponent;
  let fixture: ComponentFixture<SixteenthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SixteenthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SixteenthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
