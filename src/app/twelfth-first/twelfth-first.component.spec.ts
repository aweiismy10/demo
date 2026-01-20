import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwelfthFirstComponent } from './twelfth-first.component';

describe('TwelfthFirstComponent', () => {
  let component: TwelfthFirstComponent;
  let fixture: ComponentFixture<TwelfthFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwelfthFirstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwelfthFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
