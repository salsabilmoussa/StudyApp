// revision.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  isRevisionModeActivated = false;

  constructor() { }

  activateRevisionMode() {
    this.isRevisionModeActivated = true;
  }

  deactivateRevisionMode() {
    this.isRevisionModeActivated = false;
  }
}
