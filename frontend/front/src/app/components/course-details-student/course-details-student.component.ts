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
  pdfurl:string='';
  constructor(private route: ActivatedRoute,private courseService: CourseServiceService ,private userService:UserServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const fileName = params['fileName']; // Assuming 'fileName' is the parameter name
      // Construct the pdfurl using the file name
      this.pdfurl = `../../../assets/${fileName}`; 
      console.log(this.pdfurl);
      // Replace '/path/to/pdf/files/' with your actual file path
    });
  
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
        
  }

}
