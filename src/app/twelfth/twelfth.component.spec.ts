import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwelfthComponent } from './twelfth.component';

describe('TwlefthComponent', () => {
  let component: TwelfthComponent;
  let fixture: ComponentFixture<TwelfthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwelfthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwelfthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
