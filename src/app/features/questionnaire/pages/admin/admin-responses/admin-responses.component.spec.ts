import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResponsesComponent } from './admin-responses.component';

describe('AdminResponsesComponent', () => {
  let component: AdminResponsesComponent;
  let fixture: ComponentFixture<AdminResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminResponsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
