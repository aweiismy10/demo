import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlExerciseComponent } from './html-exercise.component';

describe('FirstComponent', () => {
  let component: HtmlExerciseComponent;
  let fixture: ComponentFixture<HtmlExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
