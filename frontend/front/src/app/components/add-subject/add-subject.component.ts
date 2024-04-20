import { Component , OnInit} from '@angular/core';
import { Subject } from '../../models/subject';
import { SubjectServiceService } from '../../services/subject-service.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  newSubject: Subject = {
    title: '',
    description: '',
    professor: '',
    image: '',
    speciality: ''
  };
  imageUrl: string | ArrayBuffer | null = null; // Holds the preview image URL

  constructor(private subjectService: SubjectServiceService) { }

  ngOnInit(): void {}
  onSubmit(): void {
    this.subjectService.createSubject(this.newSubject)
      .subscribe(
        response => {
          console.log('Subject created successfully:', response);
          // redirect to another page 
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
        const contentType = file.type;
        this.newSubject.image = `data:${contentType};base64,${imageData}`; // Store base64 encoded image data and content type
        this.imageUrl = imageData; // Display preview image
      };
    }
  }
}
