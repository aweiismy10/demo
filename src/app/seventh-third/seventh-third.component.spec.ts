import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventhThirdComponent } from './seventh-third.component';

describe('SeventhThirdComponent', () => {
  let component: SeventhThirdComponent;
  let fixture: ComponentFixture<SeventhThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeventhThirdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeventhThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
