import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isRevisionModeActivated: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }


  redirectToTimerPage() {
    this.isRevisionModeActivated = true; 
    if (this.isRevisionModeActivated) {
      this.router.navigateByUrl('/timer');
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
