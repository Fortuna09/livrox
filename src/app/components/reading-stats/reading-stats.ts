import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reading-stats',
  standalone: false,
  templateUrl: './reading-stats.html',
  styleUrls: ['./reading-stats.scss']
})
export class ReadingStatsComponent {
  @Input() pagesRead: number = 0;
  @Input() totalPages: number = 0;
  @Input() progress: number = 0;
  @Input() isCompleted: boolean = false;

  get statusText(): string {
    if (this.isCompleted) return '✓ Concluído';
    if (this.pagesRead && this.pagesRead > 0) return 'Em Leitura';
    return 'Não Iniciado';
  }
}
