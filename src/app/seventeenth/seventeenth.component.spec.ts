import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventeenthComponent } from './seventeenth.component';

describe('SeventeenthComponent', () => {
  let component: SeventeenthComponent;
  let fixture: ComponentFixture<SeventeenthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeventeenthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeventeenthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
