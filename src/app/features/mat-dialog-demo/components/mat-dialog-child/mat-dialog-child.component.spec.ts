import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogChildComponent } from './mat-dialog-child.component';

describe('TwlefthComponent', () => {
  let component: MatDialogChildComponent;
  let fixture: ComponentFixture<MatDialogChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDialogChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
