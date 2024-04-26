// PopupAddGroupService
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupAddGroupService {
  isPopupOpen: boolean = false;
  popupStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
    this.popupStateChanged.emit(this.isPopupOpen);
  }

  
}