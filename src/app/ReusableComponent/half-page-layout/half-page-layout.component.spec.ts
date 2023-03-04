import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfPageLayoutComponent } from './half-page-layout.component';

describe('HalfPageLayoutComponent', () => {
  let component: HalfPageLayoutComponent;
  let fixture: ComponentFixture<HalfPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalfPageLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalfPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
