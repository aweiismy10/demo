import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinthDeleteComponent } from './ninth-delete.component';

describe('NinthDeleteComponent', () => {
  let component: NinthDeleteComponent;
  let fixture: ComponentFixture<NinthDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinthDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinthDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
