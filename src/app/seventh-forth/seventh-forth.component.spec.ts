import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventhForthComponent } from './seventh-forth.component';

describe('SeventhForthComponent', () => {
  let component: SeventhForthComponent;
  let fixture: ComponentFixture<SeventhForthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeventhForthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeventhForthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
