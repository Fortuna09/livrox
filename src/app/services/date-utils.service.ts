import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  calculateDaysDifference(startDate: string, endDate?: string): number {
    const start = new Date(startDate + 'T00:00:00');
    const end = endDate ? new Date(endDate + 'T00:00:00') : new Date();
    
    const diffTime = end.getTime() - start.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  generateDateRange(startDate: string, endDate?: string): string[] {
    const dates: string[] = [];
    const start = new Date(startDate + 'T00:00:00');
    const end = endDate ? new Date(endDate + 'T00:00:00') : new Date();
    
    const daysDiff = this.calculateDaysDifference(startDate, endDate);
    
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  }
}
