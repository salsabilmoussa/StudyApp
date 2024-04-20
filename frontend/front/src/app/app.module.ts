import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TeacherCourseComponent } from './components/teacher-course/teacher-course.component';
import { StudentCourseComponent } from './components/student-course/student-course.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CouseDetailsTeacherComponent } from './components/couse-details-teacher/couse-details-teacher.component';
import { CourseDetailsStudentComponent } from './components/course-details-student/course-details-student.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherCourseComponent,
    StudentCourseComponent,
    AddCourseComponent,
    CouseDetailsTeacherComponent,
    CourseDetailsStudentComponent,
    AddSubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
