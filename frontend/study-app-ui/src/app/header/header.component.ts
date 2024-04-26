import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RevisionService } from '../service/revision.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private http: HttpClient, private router: Router, private revisionService: RevisionService) {
  }

  get isRevisionModeActivated(): boolean {
    return this.revisionService.isRevisionModeActivated;
  }


  openTimerPage() {
    this.revisionService.activateRevisionMode();
    if (this.revisionService.isRevisionModeActivated) {
      window.open('/timer', '_blank');
    }
  }

  redirectToHomePage() {
    this.router.navigate(['']);
  }

  // onClickModeRevision() {
  //   setInterval(() => {
  //     this.http.get('http://localhost:8080/detection', { responseType: 'text' })
  //       .subscribe(
  //         (response: string) => {
  //           console.log('Response:', response); // Afficher la réponse dans la console
  //         },
  //         (error) => {
  //           console.error('Error fetching response:', error); // Afficher les erreurs dans la console
  //         }
  //       );
  //   }, 1000);
  // }
}
