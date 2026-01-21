import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingExerciseComponent } from './binding-exercise.component';

describe('ForthComponent', () => {
  let component: BindingExerciseComponent;
  let fixture: ComponentFixture<BindingExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BindingExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BindingExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
