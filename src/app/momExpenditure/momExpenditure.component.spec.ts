import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoMExpenditureComponent } from './momExpenditure.component';

describe('MoMExpenditureComponent', () => {
  let component: MoMExpenditureComponent;
  let fixture: ComponentFixture<MoMExpenditureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoMExpenditureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoMExpenditureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
