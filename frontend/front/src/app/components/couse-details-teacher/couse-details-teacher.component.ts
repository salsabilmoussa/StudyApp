import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course'; 
import { Router } from '@angular/router';
import { CourseServiceService } from '../../services/course-service.service';

@Component({
  selector: 'app-couse-details-teacher',
  templateUrl: './couse-details-teacher.component.html',
  styleUrls: ['./couse-details-teacher.component.css']
})
export class CouseDetailsTeacherComponent {
  courseId: string|null="";
  cours: string[]=[];
  td: string[]=[];
  tp: string[]=[];
  newCours: File[] = [];
  newTd: File[] = [];
  newTp: File[] = [];
  hovered:boolean=false;
  course :Course=new Course();
  save: boolean=false;

  constructor(private route: ActivatedRoute,private courseService: CourseServiceService) { }

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
  onMouseEnter(file: any) {
    this.hovered = !this.hovered; 
  }

  onMouseLeave() {
    this.hovered = !this.hovered; 
  }

  deleteCours(file: any) {
    const index = this.course.cours?.indexOf(file);
  if (index !== undefined && index !== -1) {
    this.course.cours?.splice(index, 1); // Remove the file from the cours array
    this.courseService.update(this.courseId, this.course)
      .subscribe(updatedCourse => {
        console.log('File deleted:', file);
        console.log('Updated course:', updatedCourse);
        this.cours = updatedCourse.cours || [];
      }, error => {
        console.error('Error deleting file:', error);
      });
  }
  
  }
  deleteTd(file: any) {
    const index = this.course.td?.indexOf(file);
  if (index !== undefined && index !== -1) {
    this.course.td?.splice(index, 1); // Remove the file from the cours array
    this.courseService.update(this.courseId, this.course)
      .subscribe(updatedCourse => {
        console.log('File deleted:', file);
        console.log('Updated course:', updatedCourse);
        this.td = updatedCourse.td || [];
      }, error => {
        console.error('Error deleting file:', error);
      });
  }
    
  }
  deleteTp(file: any) {
    const index = this.course.tp?.indexOf(file);
  if (index !== undefined && index !== -1) {
    this.course.tp?.splice(index, 1); // Remove the file from the cours array
    this.courseService.update(this.courseId, this.course)
      .subscribe(updatedCourse => {
        console.log('File deleted:', file);
        console.log('Updated course:', updatedCourse);
        this.tp = updatedCourse.tp || [];
      }, error => {
        console.error('Error deleting file:', error);
      });
  }
  
  }
  onFileChange(event: any, type: string) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      if (type === 'cours') {
        this.newCours = Array.from(files);
      } else if (type === 'td') {
        this.newTd = Array.from(files);
      } else if (type === 'tp') {
        this.newTp= Array.from(files);
      }
      this.save=true;
    }
  }

  addNewFiles() {
    const formData: FormData = new FormData();
    this.newCours.forEach(file => formData.append('cours', file));
    this.newTd.forEach(file => formData.append('td', file));
    this.newTp.forEach(file => formData.append('tp', file));

    this.courseService.addFiles(this.courseId, formData).subscribe(updatedCourse => {
      console.log('Files added successfully:', updatedCourse);
      this.course = updatedCourse;
      this.cours = updatedCourse.cours || [];
      this.td = updatedCourse.td || [];
      this.tp = updatedCourse.tp || [];
    }, error => {
      console.error('Error adding files:', error);
    });
  }
}
