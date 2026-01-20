import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirteenthFirstComponent } from './thirteenth-first.component';

describe('ThirteenthFirstComponent', () => {
  let component: ThirteenthFirstComponent;
  let fixture: ComponentFixture<ThirteenthFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirteenthFirstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirteenthFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
