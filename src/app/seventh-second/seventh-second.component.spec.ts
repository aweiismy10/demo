import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventhSecondComponent } from './seventh-second.component';

describe('SeventhSecondComponent', () => {
  let component: SeventhSecondComponent;
  let fixture: ComponentFixture<SeventhSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeventhSecondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeventhSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
