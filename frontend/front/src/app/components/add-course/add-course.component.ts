import { Component } from '@angular/core';
import { Course } from '../../models/course'; 
import { CourseServiceService } from 'src/app/services/course-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  cours : File[]=[];
  td : File[]=[];
  tp : File[]=[];
  constructor(private courseService: CourseServiceService, private router: Router, private route: ActivatedRoute) {}

  course: Course = new Course();

  ngOnInit(): void {
    // Get the subjectId from the URL query parameters
    this.route.queryParams.subscribe(params => {
      const subjectId = params['subjectId'];
      // Set the subjectId to the course object
      this.course.subject = subjectId;
    });
  }
  submitCourse() {
    const formData = new FormData();

    
      for (const file of this.cours) { formData.append('cours', file, file.name); }
    
    for (const file of this.td) { formData.append('td', file, file.name); }

    for (const file of this.tp) { formData.append('tp', file, file.name); }
    
    const courseBlob = new Blob([JSON.stringify(this.course)], { type: 'application/json' });
    formData.append('course', courseBlob);
    this.courseService.create(formData).subscribe(response => {
      console.log('Response from server:', response);
      this.router.navigate(['/teacher'], { queryParams: { subjectId: this.course.subject } });
    }, error => {
      console.error('Error occurred:', error);
      if (error.status === 403) {
        alert('Only teachers can create new courses.');
      }
    });
    console.log('Form submitted:', this.course);
  }
  onFileChange(event: any) {
    this.cours = event.target.files; // Assuming this.files is an array to store files
  }
  onFileChange1(event: any) {
    this.td = event.target.files; // Assuming this.files is an array to store files
  }
  onFileChange2(event: any) {
    this.tp = event.target.files; // Assuming this.files is an array to store files
  }
}
