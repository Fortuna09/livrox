import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-not-started-card',
  standalone: false,
  templateUrl: './not-started-card.html',
  styleUrls: ['./not-started-card.scss']
})
export class NotStartedCardComponent {
  @Output() startReading = new EventEmitter<void>();

  onStartReading(): void {
    this.startReading.emit();
  }
}
