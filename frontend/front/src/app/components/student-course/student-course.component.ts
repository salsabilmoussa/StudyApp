import { Component ,OnInit} from '@angular/core';
import { Course } from '../../models/course'; 
import { CourseServiceService } from '../../services/course-service.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent {
  courses: Course[] = [];

  constructor(private courseService: CourseServiceService, private router: Router) { }

  ngOnInit() {
    this.courseService.getAll()
      .subscribe(courses => {
        this.courses = courses;
      });
  }
  navigateToDetails(id:string){
    this.router.navigate(['/courseDetailsStudent', id]);
  }
  onDoownload(id :string ,name:string){
    this.courseService.getFile(id,name).subscribe( (event: HttpEvent<Blob>) => {
      if (event.type === HttpEventType.Response) {
        const blob = new Blob([event.body!], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    }
  );
    console.log(name);
  }

  /*addToFavorites(course: Course) {
    // Scenario 1: Add to favorites on backend

    this.courseService.addToFavorites(course.id) // Replace with actual method name
      .subscribe(response => {
        if (response.success) {
          console.log('Course added to favorites');
          // Update UI to reflect the change (optional)
        } else {
          console.error('Failed to add course to favorites');
        }
      });

    // Scenario 2: Store favorites in local storage (simple approach)

    const currentFavorites = localStorage.getItem('favorites') || '[]';
    const favorites = JSON.parse(currentFavorites) as number[];
    favorites.push(course.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Course added to favorites (local storage)');
  }*/

}
