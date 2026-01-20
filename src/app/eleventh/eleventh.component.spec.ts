import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleventhComponent } from './eleventh.component';

describe('EleventhComponent', () => {
  let component: EleventhComponent;
  let fixture: ComponentFixture<EleventhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleventhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleventhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
