import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Book, Achievement, MedalType } from '../../models/book.model';
import { CalendarDay } from '../../models/calendar.model';
import { BookService } from '../../services/book.service';
import { ReadingProgressService } from '../../services/reading-progress.service';
import { DateUtilsService } from '../../services/date-utils.service';
import { AchievementsService } from '../../services/achievements.service';
import { MESSAGES } from '../../constants/reading.constants';

@Component({
  selector: 'app-book-details',
  standalone: false,
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss',
})
export class BookDetails implements OnInit, OnDestroy {
  book: Book | null = null;
  calendarDays: CalendarDay[] = [];
  achievements: Achievement[] = [];
  medals: MedalType[] = [];
  hasTrophy: boolean = false;

  private readonly destroy$ = new Subject<void>();
  private bookId: number = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService,
    private readonly readingProgressService: ReadingProgressService,
    private readonly dateUtils: DateUtilsService,
    private readonly achievementsService: AchievementsService
  ) { }

  ngOnInit(): void {
    this.subscribeToRouteParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Public getters
  hasStartedReading(): boolean {
    return this.book?.readingStatus !== 'not-started';
  }

  getProgress(): number {
    if (!this.book) return 0;
    return this.readingProgressService.calculateProgress(
      this.book.pagesRead || 0,
      this.book.totalPages || 0
    );
  }

  getTodayDate(): string {
    return this.dateUtils.getTodayDate();
  }

  formatDate(dateString: string): string {
    return this.dateUtils.formatDate(dateString);
  }

  // Actions - Reading lifecycle
  startReading(): void {
    if (!this.book) return;
    
    this.book.readingStatus = 'reading';
    this.book.startReadingDate = this.getTodayDate();
    this.generateCalendar();
    this.updateAchievements();
    console.log(MESSAGES.READING_STARTED);
  }

  cancelReading(): void {
    if (!this.book || !confirm(MESSAGES.CONFIRM_CANCEL_READING)) return;
    
    this.readingProgressService.resetBookProgress(this.book);
    this.calendarDays = [];
    this.updateAchievements();
    console.log(MESSAGES.READING_CANCELLED);
  }

  onManualActivityAdded(activity: { date: string; pages: number }): void {
    if (!this.book) return;

    this.addReadingActivity(activity.date, activity.pages);
    console.log('Atividade manual adicionada:', activity);
  }

  // Private methods
  private subscribeToRouteParams(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.bookId = +params['id'];
        this.loadBook();
      });
  }

  private loadBook(): void {
    this.bookService.getBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (books) => this.handleBooksLoaded(books),
        error: (error) => this.handleLoadError(error)
      });
  }

  private handleBooksLoaded(books: Book[]): void {
    this.book = books.find(b => b.id === this.bookId) || null;
    
    if (!this.book) return;

    this.initializeBook();
  }

  private handleLoadError(error: any): void {
    console.error(MESSAGES.ERROR_LOADING_BOOK, error);
  }

  private initializeBook(): void {
    if (!this.book) return;

    this.readingProgressService.initializeBookDefaults(this.book);
    this.achievementsService.initializeAchievements(this.book);
    this.generateCalendar();
    this.updateAchievements();
  }

  private addReadingActivity(date: string, pages: number): void {
    if (!this.book) return;

    this.readingProgressService.addToHistory(this.book, date, pages);
    this.readingProgressService.updateBookProgress(this.book, pages);
    this.generateCalendar();
    this.updateAchievements();
  }

  private updateAchievements(): void {
    if (!this.book) return;
    
    const progress = this.getProgress();
    this.achievements = this.achievementsService.updateAchievements(this.book, progress);
    this.medals = this.achievementsService.getEarnedMedals(this.book, progress);
    this.hasTrophy = this.checkTrophyEarned();
    
    this.book.achievements = this.achievements;
    this.book.medals = this.medals;
  }

  private checkTrophyEarned(): boolean {
    return this.achievements.length > 0 && this.achievements.every(a => a.completed);
  }

  private generateCalendar(): void {
    if (!this.book?.startReadingDate) {
      this.calendarDays = [];
      return;
    }

    const dates = this.dateUtils.generateDateRange(this.book.startReadingDate);
    this.calendarDays = dates.map(date => this.createCalendarDay(date));
  }

  private createCalendarDay(date: string): CalendarDay {
    const activity = this.book?.readingHistory?.find(a => a.date === date);
    const pagesRead = activity?.pagesRead || 0;
    const intensity = this.readingProgressService.calculateIntensity(pagesRead);
    
    return { date, pagesRead, intensity };
  }
}
