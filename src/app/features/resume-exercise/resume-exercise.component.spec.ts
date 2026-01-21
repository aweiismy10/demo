import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeExerciseComponent } from './resume-exercise.component';

describe('ThirdComponent', () => {
  let component: ResumeExerciseComponent;
  let fixture: ComponentFixture<ResumeExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
