import { Component, Input } from '@angular/core';
import { Achievement } from '../../models/book.model';

@Component({
  selector: 'app-achievements',
  standalone: false,
  templateUrl: './achievements.html',
  styleUrls: ['./achievements.scss']
})
export class AchievementsComponent {
  @Input() achievements: Achievement[] = [];

  getCompletedCount(): number {
    return this.achievements.filter(a => a.completed).length;
  }

  getTotalCount(): number {
    return this.achievements.length;
  }

  allAchievementsCompleted(): boolean {
    return this.achievements.length > 0 && this.achievements.every(a => a.completed);
  }

  getAchievementIcon(achievement: Achievement): string {
    switch(achievement.id) {
      case 'complete_book': return '💎';
      case 'daily_reader': return '📅';
      case 'speed_reader': return '⚡';
      default: return '🏅';
    }
  }
}
