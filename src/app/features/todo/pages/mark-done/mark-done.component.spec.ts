import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkDoneComponent } from './mark-done.component';

describe('NinthMarkComponent', () => {
  let component: MarkDoneComponent;
  let fixture: ComponentFixture<MarkDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
