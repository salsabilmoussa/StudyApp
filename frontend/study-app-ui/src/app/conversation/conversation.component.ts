import { Component, HostListener, OnInit } from '@angular/core';
import { GetGroupService } from '../service/get-group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from '../service/web-socket.service';
import { MessageService } from '../service/message.service';
import { PopupEditGroupService } from '../service/popup-edit-group.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  message: any;
  messages: { groupId: string, message: string , timestamp: string, img: string}[] = [];
  groupId: string = '';
  parsedMessage: any;
  img: string = '';

  msg = {
    content: '',
    sender: 'senderName',
    groupId: '',
    timestamp: '',
    img:''
  };
  msgs : any;

  groupe = {
    id : '',
    lastMessage : ''
  }
  grp : any;
  isPopupOpen: boolean = false;
  constructor(
    private webSocketService: WebSocketService,
    private activatedRoute: ActivatedRoute,
    private messageService : MessageService,
    private updateService : GetGroupService,
    private popup : PopupEditGroupService,
    private router : Router
  ) {}

  ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.msg.groupId = params['groupId'];
      this.getGroupe();
    });

    this.webSocketService.getMessage().subscribe((msg: any) => {
       // Add message to the array
      try {
        this.parsedMessage = JSON.parse(msg);
      } catch (error) {
        console.log('Le message n\'est pas un JSON :', msg);
      }
      this.messages.push(this.parsedMessage);
    });

    this.messageService.getAllMessages().subscribe(
      res =>{
        this.msgs = res;
      },
      err => {
        console.log(err);
      }
    );
    this.updateService.getGroupeById(this.groupId).subscribe(
      res =>{
      },err => {
        console.log(err);
      }
    );

    this.popup.popupStateChanged.subscribe(isOpen => {
      this.isPopupOpen = isOpen;
    });
    
    }

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      
      this.img = "../../../assets/images/"+file.name;
      
      // Vérification du type de fichier
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
        };
        // Lecture du contenu du fichier en tant que chaîne de caractères base64
        reader.readAsDataURL(file);
      } else {
        console.error('Le fichier sélectionné n\'est pas une image.');
        // Affichez un message d'erreur ou effectuez une action appropriée
      }
    }


  sendMessage() {
    if(this.message != null || this.img != ''){
    this.msg.content = this.message;
    this.msg.timestamp = new Date().toLocaleTimeString();
    this.msg.img = this.img;
    const messageObject = {
      groupId: this.msg.groupId,
      message: this.msg.content,
      timestamp: this.msg.timestamp,
      img: this.msg.img
    };


    this.groupe.id = this.msg.groupId;
    this.groupe.lastMessage = this.msg.content;
    if(this.msg.img){
      this.groupe.lastMessage = "photo";
    }


    const messageJson = JSON.stringify(messageObject);
    this.webSocketService.sendMessage(messageJson);

    this.message = '';
    this.img='';

    this.messageService.createNewMessage(this.msg)
    .subscribe(
      res=>{
      },
      err =>{
        console.log(err);
      }
    );

    this.updateService.upDateGroup(this.groupe)
    .subscribe(
      res =>{
      }, err => {
        console.log(err);
      }
    );
    }
  }


getGroupe () {
  this.updateService.getGroupeById(this.groupId).subscribe(
    res =>{
      this.grp = res;
    },err => {
      console.log(err);
    }
  );
}

@HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }


  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Vérifier si event.target est null ou si le clic n'est pas à l'intérieur du menu déroulant
    if (!event.target || !(event.target instanceof Element) ||
        (!event.target.closest('.action_menu_btn') && !event.target.closest('#action_menu_btn'))) {
      this.isDropdownOpen = false;
    }
  }

  deleteGroup(){
    this.updateService.deleteGroupe(this.groupId).subscribe(
      res => {
        this.router.navigateByUrl('/');
        window.location.reload();
      }, err => {
        console.log(err);
      }
    );
  }

  
  openPopup(groupId: string) {
    this.popup.setGroupId(groupId);
    this.popup.togglePopupEdit(); // Ouvre le popup de modification
  }
  
  suppImg(){
    this.img = '';
  }
}