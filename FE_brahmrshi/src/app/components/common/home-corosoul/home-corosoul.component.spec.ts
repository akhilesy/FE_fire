import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCorosoulComponent } from './home-corosoul.component';

describe('HomeCorosoulComponent', () => {
  let component: HomeCorosoulComponent;
  let fixture: ComponentFixture<HomeCorosoulComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCorosoulComponent]
    });
    fixture = TestBed.createComponent(HomeCorosoulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
