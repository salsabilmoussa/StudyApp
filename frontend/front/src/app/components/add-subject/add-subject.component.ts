import { Component , OnInit} from '@angular/core';
import { Subject } from '../../models/subject';
import { SubjectServiceService } from '../../services/subject-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  newSubject: Subject = new Subject();
  subjectForm!: FormGroup;
  imageUrl: string | ArrayBuffer | null = null; // Holds the preview image URL

  constructor(private subjectService: SubjectServiceService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      title: ['', Validators.required], // Set up form controls with validators
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  onSubmit(): void {
    this.newSubject.speciality='Computer Science';
    console.log(this.newSubject);
    this.subjectService.createSubject(this.newSubject)
      .subscribe(
        response => {
          console.log('Subject created successfully:', response);
          // redirect to another page 
          this.router.navigate(['/add-course'], { queryParams: { subjectId: response.id } });
     
          
        },
        error => {
          console.error('Error creating subject:', error);
          // Optionally, show an error message to the user
        }
      );
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageData = reader.result as string;
      this.newSubject.image = imageData; 
      this.imageUrl = imageData;
      };
    }
  }
}
