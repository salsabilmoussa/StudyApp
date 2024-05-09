import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetGroupService } from '../service/get-group.service';
import { PopupEditGroupService } from '../service/popup-edit-group.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  groupId: string = '';
  isPopupOpen: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private updateGroup: GetGroupService,
    private groupIdService: PopupEditGroupService
  ) {
    this.form = this.formBuilder.group({
      name: null,
      lastMessage : null,
      pic: null
    });
  }


  submitForm() {
    const formData = this.form.value; // Récupérer les valeurs du formulaire
    formData.id = this.groupIdService.groupId; // Ajouter l'ID du groupe
    console.log("submit", formData);
    this.updateGroup.upDateGroup(formData)
    .subscribe(
      res =>{
        console.log("update works !",res);
        this.closePopup();
        window.location.reload();
      }, err => {
        console.log(err);
      }
    );
  }
  onFileSelected(event: any) {
    console.log("groupId",this.groupIdService.groupId)
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


  closePopup() {
    this.groupIdService.togglePopupEdit();
    this.isPopupOpen = this.groupIdService.isPopupOpenEdit;
  }

}