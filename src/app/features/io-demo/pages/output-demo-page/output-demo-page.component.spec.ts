import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDemoPageComponent } from './output-demo-page.component';

describe('SeventhThirdComponent', () => {
  let component: OutputDemoPageComponent;
  let fixture: ComponentFixture<OutputDemoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputDemoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
