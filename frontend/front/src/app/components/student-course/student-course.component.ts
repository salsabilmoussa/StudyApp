import { Component ,OnInit} from '@angular/core';
import { Course } from '../../models/course'; 
import { CourseServiceService } from '../../services/course-service.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http'; 
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent {
  courses: Course[] = [];
  showfavorite: boolean = false;
  constructor(private courseService: CourseServiceService, private router: Router, private route:ActivatedRoute,private userService:UserServiceService) { }

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
  navigateToDetails(id:string){
    this.router.navigate(['/courseDetailsStudent', id]);
  }
  onDownload(id :string ,name:string){
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
  addFavorite(id:string , name:string){
    this.showfavorite = !this.showfavorite;
        this.userService.addFavorite(id,name).subscribe(() => {
          
          });
  }

}
