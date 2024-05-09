import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetGroupService } from '../service/get-group.service';
import { PopupAddGroupService } from '../service/popup-add-group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private groupCreate: GetGroupService,
    private popup: PopupAddGroupService
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      pic: ['']
    });
  }

  submitForm() {
    const formData = this.form.value; // Récupérer les valeurs du formulaire
    this.groupCreate.createGroupe(formData).subscribe(
      res => {
        console.log(res);
        this.closePopup();
        window.location.reload();
      }, err => {
        console.log(err);
      }
    );
  }

  isPopupOpen: boolean = true; // Variable de statut pour indiquer si le popup est ouvert ou fermé

  closePopup() {
    this.popup.togglePopup();
    this.isPopupOpen = this.popup.isPopupOpen;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Vous pouvez gérer le téléchargement de l'image ici
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Obtenez l'URL de l'image sélectionnée et affectez-le au contrôle de formulaire correspondant
        this.form.patchValue({
          pic: reader.result
        });
      };
    }
  }
}