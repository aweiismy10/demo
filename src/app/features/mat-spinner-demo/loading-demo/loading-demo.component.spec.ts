import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDemoComponent } from './loading-demo.component';

describe('ForteenthComponent', () => {
  let component: LoadingDemoComponent;
  let fixture: ComponentFixture<LoadingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
