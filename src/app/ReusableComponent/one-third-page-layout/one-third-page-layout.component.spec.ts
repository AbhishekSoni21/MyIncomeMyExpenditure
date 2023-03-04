import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneThirdPageLayoutComponent } from './one-third-page-layout.component';

describe('OneThirdPageLayoutComponent', () => {
  let component: OneThirdPageLayoutComponent;
  let fixture: ComponentFixture<OneThirdPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneThirdPageLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneThirdPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
