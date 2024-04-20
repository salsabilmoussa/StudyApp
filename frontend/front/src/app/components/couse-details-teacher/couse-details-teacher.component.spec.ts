import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouseDetailsTeacherComponent } from './couse-details-teacher.component';

describe('CouseDetailsTeacherComponent', () => {
  let component: CouseDetailsTeacherComponent;
  let fixture: ComponentFixture<CouseDetailsTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouseDetailsTeacherComponent]
    });
    fixture = TestBed.createComponent(CouseDetailsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
