import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupEditGroupService {
  groupId: string = '';
  isPopupOpenEdit: boolean = false;
  popupStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();


  togglePopupEdit() {
    this.isPopupOpenEdit = !this.isPopupOpenEdit;
    this.popupStateChanged.emit(this.isPopupOpenEdit);
    console.log("service work!",this.isPopupOpenEdit)
  }

  setGroupId(groupId: string) {
    this.groupId = groupId;
  }

  getGroupId() {
    return this.groupId;
  }
}