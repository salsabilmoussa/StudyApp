import { Component } from '@angular/core';
import { Course } from '../../models/course'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CourseServiceService } from '../../services/course-service.service';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent {
  courses: Course[] = [];
  constructor(private courseService: CourseServiceService, private router: Router,private route:ActivatedRoute) { }
  hovered:boolean=false;
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const subjectId = params['subjectId'];
  
      // Fetch only the courses with the specified subjectId
      this.courseService.getAll().subscribe(courses => {
        // Filter the courses based on the subjectId
        this.courses = courses.filter(course => course.subject === subjectId);
        console.log(this.courses);
      });
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
