import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsStudentComponent } from './course-details-student.component';

describe('CourseDetailsStudentComponent', () => {
  let component: CourseDetailsStudentComponent;
  let fixture: ComponentFixture<CourseDetailsStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDetailsStudentComponent]
    });
    fixture = TestBed.createComponent(CourseDetailsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
