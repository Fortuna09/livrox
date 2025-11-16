import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface CalendarDay {
  date: string;
  pagesRead: number;
  intensity: number;
}

export interface ManualActivity {
  date: string;
  pages: number;
}

@Component({
  selector: 'app-reading-calendar',
  standalone: false,
  templateUrl: './reading-calendar.html',
  styleUrls: ['./reading-calendar.scss']
})
export class ReadingCalendarComponent {
  @Input() calendarDays: CalendarDay[] = [];
  @Input() startDateFormatted: string = '';
  @Input() maxDate: string = '';
  @Output() addActivity = new EventEmitter<ManualActivity>();
  
  showForm: boolean = false;
  selectedDate: string = '';
  manualPages: number = 0;

  onToggleForm(){
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.selectedDate = this.maxDate;
      this.manualPages = 0;
    }
  }

  onSaveActivity(){
    if (this.selectedDate && this.manualPages > 0) {
      this.addActivity.emit({ 
        date: this.selectedDate, 
        pages: this.manualPages 
      });
      this.showForm = false;
      this.selectedDate = '';
      this.manualPages = 0;
    }
  }

  getTooltip(day: CalendarDay): string {
    if (day.pagesRead === 0) {
      return `Sem leitura`;
    }
    return `${day.pagesRead} página${day.pagesRead > 1 ? 's' : ''}`;
  }
}
