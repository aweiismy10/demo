import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputChildComponent } from './output-child.component';

describe('SeventhForthComponent', () => {
  let component: OutputChildComponent;
  let fixture: ComponentFixture<OutputChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
