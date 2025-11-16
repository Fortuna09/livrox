import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ReadingProgressService } from '../../services/reading-progress.service';
import { DateUtilsService } from '../../services/date-utils.service';
import { MESSAGES } from '../../constants/reading.constants';

export interface CalendarDay {
  date: string;
  pagesRead: number;
  intensity: number;
}

@Component({
  selector: 'app-book-details',
  standalone: false,
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss',
})
export class BookDetails implements OnInit {
  book: Book | null = null;
  bookId: number = 0;
  calendarDays: CalendarDay[] = [];
  selectedDate: string = '';
  manualPagesRead: number = 0;
  showManualForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private readingProgressService: ReadingProgressService,
    private dateUtils: DateUtilsService
  ) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      this.loadBook();
    });
  }

  // Status checks
  hasStartedReading(): boolean {
    return this.book?.readingStatus !== 'not-started';
  }

  // Computed values
  getProgress(): number {
    if (!this.book) return 0;
    return this.readingProgressService.calculateProgress(
      this.book.pagesRead || 0,
      this.book.totalPages || 0
    );
  }

  getStartDateFormatted(): string {
    if (!this.book?.startReadingDate) return '';
    return this.dateUtils.formatDate(this.book.startReadingDate);
  }

  getTodayDate(): string {
    return this.dateUtils.getTodayDate();
  }

  formatDate(dateString: string): string {
    return this.dateUtils.formatDate(dateString);
  }

  getIntensityClass(intensity: number): string {
    return `intensity-${intensity}`;
  }

  getDayTooltip(day: CalendarDay): string {
    const formattedDate = this.formatDate(day.date);
    if (day.pagesRead === 0) {
      return `${formattedDate}: Sem leitura`;
    }
    return `${formattedDate}: ${day.pagesRead} página${day.pagesRead > 1 ? 's' : ''}`;
  }

  // Actions - Reading lifecycle
  startReading(): void {
    if (!this.book) return;
    this.book.readingStatus = 'reading';
    this.book.startReadingDate = this.getTodayDate();
    this.generateCalendar();
    console.log(MESSAGES.READING_STARTED);
  }

  cancelReading(): void {
    if (!this.book) return;
    
    if (confirm(MESSAGES.CONFIRM_CANCEL_READING)) {
      this.readingProgressService.resetBookProgress(this.book);
      this.calendarDays = [];
      console.log(MESSAGES.READING_CANCELLED);
    }
  }

  
  // Actions - Manual activity
  toggleManualForm(): void {
    this.showManualForm = !this.showManualForm;
    if (this.showManualForm) {
      this.selectedDate = this.getTodayDate();
      this.manualPagesRead = 0;
    }
  }

  addManualActivity(): void {
    if (!this.book || !this.selectedDate || this.manualPagesRead <= 0) return;

    this.readingProgressService.addToHistory(this.book, this.selectedDate, this.manualPagesRead);
    this.readingProgressService.updateBookProgress(this.book, this.manualPagesRead);
    
    this.generateCalendar();
    this.showManualForm = false;
    
    console.log('Atividade manual adicionada:', { date: this.selectedDate, pages: this.manualPagesRead });
  }

  onManualActivityAdded(activity: { date: string; pages: number }): void {
    if (!this.book) return;

    this.readingProgressService.addToHistory(this.book, activity.date, activity.pages);
    this.readingProgressService.updateBookProgress(this.book, activity.pages);
    
    this.generateCalendar();
    
    console.log('Atividade manual adicionada:', activity);
  }

  // Private methods
  private loadBook(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.book = books.find(b => b.id === this.bookId) || null;
        if (this.book) {
          this.readingProgressService.initializeBookDefaults(this.book);
          this.generateCalendar();
        }
      },
      error: (error) => {
        console.error(MESSAGES.ERROR_LOADING_BOOK, error);
      }
    });
  }

  private generateCalendar(): void {
    if (!this.book || !this.book.startReadingDate) {
      this.calendarDays = [];
      return;
    }

    const dates = this.dateUtils.generateDateRange(this.book.startReadingDate);
    
    this.calendarDays = dates.map(date => {
      const activity = this.book!.readingHistory?.find(a => a.date === date);
      const pagesRead = activity?.pagesRead || 0;
      const intensity = this.readingProgressService.calculateIntensity(pagesRead);
      
      return { date, pagesRead, intensity };
    });
  }
}
