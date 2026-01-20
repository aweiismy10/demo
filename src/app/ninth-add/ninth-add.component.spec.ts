import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinthAddComponent } from './ninth-add.component';

describe('NinthAddComponent', () => {
  let component: NinthAddComponent;
  let fixture: ComponentFixture<NinthAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinthAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinthAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
