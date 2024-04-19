import { Component, Renderer2, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RevisionService } from '../revision.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  minutes: number = 25;
  seconds: number = 0;
  interval: any;
  savedTime: { minutes: number, seconds: number } | null = null;
  menuActive: boolean = false;
  isPause: boolean = false;
  currentAudio: HTMLAudioElement | null = null;
  constructor(private renderer: Renderer2, private http: HttpClient, private router: Router, private revisionService: RevisionService) {

  }

  ngOnInit() {
    this.startTimer();
  }


  startTimer() {
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          clearInterval(this.interval);
          // Le chronomètre a atteint 00:00, vous pouvez mettre ici le code à exécuter à ce moment-là
          this.showNotification();
          this.isPause= true;
          setTimeout(() => {
            this.minutes = 5;
            this.seconds = 0;
            this.startTimer1(); // Démarrer le deuxième chronomètre après 3 secondes
          }, 3000);
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
        // Appel de la méthode pour vérifier la réponse du serveur
        if(this.isPause == false ){this.onClickModeRevision();}
      }

    }, 1000);
  }

  startTimer1() {
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          clearInterval(this.interval);
          // Le chronomètre a atteint 00:00, vous pouvez mettre ici le code à exécuter à ce moment-là
          this.showShortBreakNotification();
          this.isPause= false;
          setTimeout(() => {
            this.minutes = 25;
            this.seconds = 0;
            this.startTimer(); // Démarrer le deuxième chronomètre après 3 secondes
          }, 3000);
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  onClickModeRevision() {
    this.http.get('http://localhost:8080/detection', { responseType: 'text' })
      .subscribe(
        (response: string) => {
          console.log('Response:', response); // Afficher la réponse dans la console
          if (response === 'non' && this.isPause == false) {
            clearInterval(this.interval); // Mettre en pause le chronomètre si la réponse est "non"
            // Sauvegarder le temps restant
            this.savedTime = { minutes: this.minutes, seconds: this.seconds };
          } else if (response === 'oui' && this.savedTime) {
            // Redémarrer le chronomètre avec le temps sauvegardé
            this.minutes = this.savedTime.minutes;
            this.seconds = this.savedTime.seconds;
            this.startTimer();
            // Réinitialiser savedTime
            this.savedTime = null;
          }
        },
        (error) => {
          console.error('Error fetching response:', error); // Afficher les erreurs dans la console
        }
      );
  }

  showShortBreakNotification() {
    // Envoyer une notification pour reprendre le travail
    if (Notification.permission === "granted") {
      new Notification("Reprendre le travail !", {
        body: "Les 5 minutes de pause sont écoulées. Reprenez votre travail !",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          this.showShortBreakNotification();
        }
      });
    }
  }


  // redirectToHome() {
  //   this.router.navigate(['']).then(() => {
  //     window.location.reload();
  //   });
  // }

  exitRevisionMode() {
      // Fermer le deuxième onglet (/timer)
      window.close();
      // Recharger le premier onglet (/)
      window.opener.location.reload();
  }
  

  showNotification() {
    if (Notification.permission === "granted") {
      new Notification("C'est l'heure de prendre une pause !", {
        body: "Le temps de travail est terminé. Prenez une pause de 5 minutes.",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          this.showNotification();
        }
      });
    }
  }

  changeTheme() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const imageUrl = `/assets/images/${randomNumber}.jpg`;
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }


  // Méthode pour lire l'audio
  playAudio(audioPath: string) {
    // Arrêter la lecture de l'audio en cours s'il y en a un
    if (this.currentAudio) {
      this.currentAudio.pause(); // Mettre en pause l'audio actuel
      this.currentAudio.currentTime = 0; // Remettre le curseur au début de l'audio
    }

    // Créer une nouvelle instance audio pour le nouvel audio sélectionné
    const audio = new Audio(audioPath);
    audio.load();
    audio.play();

    // Affecter l'instance audio actuelle à la nouvelle instance
    this.currentAudio = audio;
  }

  toggleMenu() {
    const menuItems = document.querySelectorAll(".menu a"); // Sélectionner les éléments du menu

    if (!this.menuActive) {
      menuItems[0].setAttribute("style", "transform: translate(50px,-50px)");
      menuItems[1].setAttribute("style", "transform: translate(0px,-70px)");
      menuItems[2].setAttribute("style", "transform: translate(-50px,-50px)");
      menuItems[3].setAttribute("style", "transform: translate(-70px,0)");
      menuItems[4].setAttribute("style", "transform: translate(70px,0)");
      this.menuActive = true;
      this.renderer.addClass(document.getElementById("toggle-btn"), "active"); // Ajouter la classe active au bouton de bascule
    } else {
      menuItems.forEach((menuItem: any) => {
        menuItem.removeAttribute("style"); // Supprimer le style en attribut
      });
      this.menuActive = false;
      this.renderer.removeClass(document.getElementById("toggle-btn"), "active"); // Supprimer la classe active du bouton de bascule
    }
  }

}
