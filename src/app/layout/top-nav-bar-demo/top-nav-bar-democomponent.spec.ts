import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavBarDemoComponent } from './top-nav-bar-demo.component';

describe('WebHeaderComponent', () => {
  let component: TopNavBarDemoComponent;
  let fixture: ComponentFixture<TopNavBarDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavBarDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopNavBarDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
