import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinthMenuComponent } from './ninth-menu.component';

describe('NinthMenuComponent', () => {
  let component: NinthMenuComponent;
  let fixture: ComponentFixture<NinthMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinthMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinthMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
