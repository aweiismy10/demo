import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogChildComponent } from '../../components/mat-dialog-child/mat-dialog-child.component';

describe('TwelfthFirstComponent', () => {
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
