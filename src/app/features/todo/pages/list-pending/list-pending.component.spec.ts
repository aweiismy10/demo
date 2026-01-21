import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPendingComponent } from './list-pending.component';

describe('NinthDisplayComponent', () => {
  let component: ListPendingComponent;
  let fixture: ComponentFixture<ListPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
