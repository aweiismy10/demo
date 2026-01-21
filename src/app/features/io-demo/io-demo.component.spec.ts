import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoDemoComponent } from './io-demo.component';

describe('SeventhComponent', () => {
  let component: IoDemoComponent;
  let fixture: ComponentFixture<IoDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IoDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IoDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
