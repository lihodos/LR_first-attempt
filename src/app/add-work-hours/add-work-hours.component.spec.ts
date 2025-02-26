import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkHoursComponent } from './add-work-hours.component';

describe('AddWorkHoursComponent', () => {
  let component: AddWorkHoursComponent;
  let fixture: ComponentFixture<AddWorkHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWorkHoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
