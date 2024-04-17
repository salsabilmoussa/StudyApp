import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private savedTime: { minutes: number; seconds: number } | null = null;

  constructor() {}

  getSavedTime(): { minutes: number; seconds: number } | null {
    return this.savedTime;
  }

  setSavedTime(time: { minutes: number; seconds: number } | null): void {
    this.savedTime = time;
  }
}
