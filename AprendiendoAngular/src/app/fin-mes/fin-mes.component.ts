import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-fin-mes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fin-mes.component.html',
  styleUrl: './fin-mes.component.css',
})
export class FinMesComponent {
  currentTime: Date;
  timeRemaining: string;
  private timer: any;
  constructor() {
    this.currentTime = new Date();
    this.timeRemaining = this.calculateTimeRemaining();
  }
  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
      this.timeRemaining = this.calculateTimeRemaining();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private calculateTimeRemaining(): string {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const diffMs = endOfMonth.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    return `${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
  }
}
