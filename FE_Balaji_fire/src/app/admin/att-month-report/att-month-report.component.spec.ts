import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttMonthReportComponent } from './att-month-report.component';

describe('AttMonthReportComponent', () => {
  let component: AttMonthReportComponent;
  let fixture: ComponentFixture<AttMonthReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttMonthReportComponent]
    });
    fixture = TestBed.createComponent(AttMonthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
