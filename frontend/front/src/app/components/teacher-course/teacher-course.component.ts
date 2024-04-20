import { Component } from '@angular/core';
import { Course } from '../../models/course'; 
import { Router } from '@angular/router';
import { CourseServiceService } from '../../services/course-service.service';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent {
  courses: Course[] = [];
  constructor(private courseService: CourseServiceService, private router: Router) { }
  hovered:boolean=false;
  ngOnInit() {
   this.courseService.getAll()
      .subscribe(courses => {
        this.courses = courses;
        console.log(courses);
      });
      
  }
  onMouseEnter() {
    this.hovered = !this.hovered; 
  }

  onMouseLeave() {
    this.hovered = !this.hovered; 
  }

  deleteCourse(course: Course) {
    this.courseService.delete(course.id).subscribe(() => {
      this.courses = this.courses.filter(c => c.id !== course.id); 
      console.log('Deleting course: ' + course.title);
    });
  }
  navigateToDetails(courseId: string) {
    // Navigate to the CourseDetailsComponent with the course ID in the URL
    this.router.navigate(['/courseDetailsTeacher', courseId]);
  }
  addNewCourse() {
    this.router.navigate(['/add-course']); // Navigate to addCourse component
  }

}
