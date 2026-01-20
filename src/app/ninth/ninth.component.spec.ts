import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinthComponent } from './ninth.component';

describe('NinthComponent', () => {
  let component: NinthComponent;
  let fixture: ComponentFixture<NinthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
