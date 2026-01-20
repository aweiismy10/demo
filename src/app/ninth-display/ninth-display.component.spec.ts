import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinthDisplayComponent } from './ninth-display.component';

describe('NinthDisplayComponent', () => {
  let component: NinthDisplayComponent;
  let fixture: ComponentFixture<NinthDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinthDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinthDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
