import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningCompositionComponent } from './earning-composition.component';

describe('EarningCompositionComponent', () => {
  let component: EarningCompositionComponent;
  let fixture: ComponentFixture<EarningCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningCompositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
