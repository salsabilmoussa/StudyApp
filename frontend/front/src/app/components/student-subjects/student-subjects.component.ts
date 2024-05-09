import { Component } from '@angular/core';
import {  Subject} from "../../models/subject";
import { SubjectServiceService } from "../../services/subject-service.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-subjects',
  templateUrl: './student-subjects.component.html',
  styleUrls: ['./student-subjects.component.css']
})
export class StudentSubjectsComponent {

  subjects: Subject[] = [];
  filteredSubjects: Subject[] = [];
  constructor(private subjectService: SubjectServiceService,private router: Router) { }

  ngOnInit(): void {
    this.loadSubjects();
  }
  loadSubjects(): void {
    this.subjectService.getAllSubjects()
      .subscribe(
        subjects => {
          this.subjects = subjects.filter(subject => subject.speciality === 'Computer Science');;
          this.filteredSubjects = this.subjects;
          console.log(this.subjects);
        },
        error => {
          console.error('Error loading subjects:', error);
          // Optionally, show an error message to the user
        }
      );
  }
  searchText = '';

  filterSubjects(): void {
    this.filteredSubjects = this.subjects.filter(subject =>
      subject.title!.toLowerCase().includes(this.searchText.toLowerCase()) ||
      subject.description!.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (subject.professor && subject.professor.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  
  enroll(subject: Subject): void {
    // Implement enrollment logic here
    console.log('Enrolling in subject:', subject);
    this.router.navigate(['/student'], { queryParams: { subjectId: subject.id } });
    // Optionally, navigate to the subject details page or show a success message
  }
}
