import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssExerciseComponent } from './css-exercise.component';

describe('SecondComponent', () => {
  let component: CssExerciseComponent;
  let fixture: ComponentFixture<CssExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CssExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
