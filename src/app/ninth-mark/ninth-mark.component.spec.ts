import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinthMarkComponent } from './ninth-mark.component';

describe('NinthMarkComponent', () => {
  let component: NinthMarkComponent;
  let fixture: ComponentFixture<NinthMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinthMarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinthMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
