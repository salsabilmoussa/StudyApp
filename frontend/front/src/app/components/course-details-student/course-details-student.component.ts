import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-course-details-student',
  templateUrl: './course-details-student.component.html',
  styleUrls: ['./course-details-student.component.css']
})
export class CourseDetailsStudentComponent {
  course :Course= new Course();
  courseId: string|null="";
  cours: string[]=[];
  td: string[]=[];
  tp: string[]=[];
  favorites:string[]=[];
  user:User=new User(); 
  showSuccessAlert: boolean = false;
  constructor(private route: ActivatedRoute,private courseService: CourseServiceService ,private userService:UserServiceService) { }

  ngOnInit(): void {
    // Retrieve the course ID from the route parameters
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.courseService.get(this.courseId)
      .subscribe(course => {
        this.course=course;
        this.cours=course.cours!;
        this.td=course.td!;
        this.tp=course.tp!;
        console.log(course);
      });
    console.log('Course ID:', this.courseId);
    
    // You can perform further operations using this.courseId
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
        this.userService.addFavorite(id,name).subscribe(() => {
          this.showSuccessAlert = true;
          setTimeout(() => {
              this.showSuccessAlert = false;
          }, 1000); // Hide alert after 3 seconds
      });
  }
}
