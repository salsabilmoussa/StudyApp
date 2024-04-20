import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { TeacherCourseComponent } from './components/teacher-course/teacher-course.component';
import { StudentCourseComponent } from './components/student-course/student-course.component';
import { CouseDetailsTeacherComponent } from './components/couse-details-teacher/couse-details-teacher.component';
import { CourseDetailsStudentComponent } from './components/course-details-student/course-details-student.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';

const routes: Routes = [
  { path: 'teacher', component: TeacherCourseComponent},
  { path: 'student', component: StudentCourseComponent},
  { path: 'courseDetailsStudent/:id', component: CourseDetailsStudentComponent},
  { path: 'courseDetailsTeacher/:id', component: CouseDetailsTeacherComponent},
  { path: 'add-course', component: AddCourseComponent},
  { path: 'add-subject', component: AddSubjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
