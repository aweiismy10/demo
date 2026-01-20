import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventhFirstComponent } from './seventh-first.component';

describe('SeventhFirstComponent', () => {
  let component: SeventhFirstComponent;
  let fixture: ComponentFixture<SeventhFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeventhFirstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeventhFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
