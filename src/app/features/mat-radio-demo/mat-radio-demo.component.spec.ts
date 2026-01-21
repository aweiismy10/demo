import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatRadioDemoComponent } from './mat-radio-demo.component';

describe('SeventeenthComponent', () => {
  let component: MatRadioDemoComponent;
  let fixture: ComponentFixture<MatRadioDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatRadioDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatRadioDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
