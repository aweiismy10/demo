import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDrawerDemoComponent } from './mat-drawer-demo.component';

describe('FifteenthComponent', () => {
  let component: MatDrawerDemoComponent;
  let fixture: ComponentFixture<MatDrawerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDrawerDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDrawerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
