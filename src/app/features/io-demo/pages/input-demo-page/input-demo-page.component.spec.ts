import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDemoPageComponent } from './input-demo-page.component';

describe('SeventhFirstComponent', () => {
  let component: InputDemoPageComponent;
  let fixture: ComponentFixture<InputDemoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDemoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
