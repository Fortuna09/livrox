import { Injectable } from '@angular/core';
import { Book, ReadingActivity } from '../models/book.model';
import { PAGES_THRESHOLDS, READING_INTENSITY } from '../constants/reading.constants';

@Injectable({
  providedIn: 'root'
})
export class ReadingProgressService {

  calculateProgress(pagesRead: number, totalPages: number): number {
    if (!totalPages || totalPages === 0) return 0;
    return Math.round((pagesRead / totalPages) * 100);
  }

  calculateIntensity(pagesRead: number): number {
    if (pagesRead === 0) return READING_INTENSITY.NONE;
    if (pagesRead <= PAGES_THRESHOLDS.LOW) return READING_INTENSITY.LOW;
    if (pagesRead <= PAGES_THRESHOLDS.MEDIUM) return READING_INTENSITY.MEDIUM;
    if (pagesRead <= PAGES_THRESHOLDS.HIGH) return READING_INTENSITY.HIGH;
    return READING_INTENSITY.VERY_HIGH;
  }

  addToHistory(book: Book, date: string, pages: number): void {
    if (!book.readingHistory) book.readingHistory = [];

    const existingActivity = book.readingHistory.find(a => a.date === date);

    if (existingActivity) {
      existingActivity.pagesRead += pages;
      
      if (existingActivity.pagesRead <= 0) {
        book.readingHistory = book.readingHistory.filter(a => a.date !== date);
      }
    } else if (pages > 0) {
      book.readingHistory.push({ date, pagesRead: pages });
      book.readingHistory.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }

  updateBookProgress(book: Book, pagesChange: number): void {
    book.pagesRead = (book.pagesRead || 0) + pagesChange;

    // Garante limites
    if (book.pagesRead < 0) book.pagesRead = 0;
    if (book.totalPages && book.pagesRead > book.totalPages) {
      book.pagesRead = book.totalPages;
    }

    // Atualiza status de conclusão
    if (book.totalPages && book.pagesRead >= book.totalPages) {
      book.isCompleted = true;
      book.readingStatus = 'completed';
    } else if (book.pagesRead < (book.totalPages || 0)) {
      book.isCompleted = false;
      if (book.readingStatus === 'completed') {
        book.readingStatus = 'reading';
      }
    }
  }

  resetBookProgress(book: Book): void {
    book.readingStatus = 'not-started';
    book.pagesRead = 0;
    book.isCompleted = false;
    book.readingHistory = [];
    book.startReadingDate = undefined;
  }

  initializeBookDefaults(book: Book): void {
    if (book.totalPages === undefined) book.totalPages = 0;
    if (book.pagesRead === undefined) book.pagesRead = 0;
    if (book.isCompleted === undefined) book.isCompleted = false;
    if (!book.readingStatus) book.readingStatus = 'not-started';
    if (!book.readingHistory) book.readingHistory = [];
  }
}
