import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatToolbarDemoComponent } from './mat-toolbar-demo.component';

describe('SixteenthComponent', () => {
  let component: MatToolbarDemoComponent;
  let fixture: ComponentFixture<MatToolbarDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatToolbarDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
