import { Pipe, PipeTransform } from '@angular/core';
import { ReadingStatus } from '../models/book.model';

@Pipe({
  name: 'readingStatus',
  standalone: false
})
export class ReadingStatusPipe implements PipeTransform {
  transform(status: ReadingStatus | undefined): string {
    switch (status) {
      case 'not-started':
        return 'Não Começado';
      case 'reading':
        return 'Em Andamento';
      case 'completed':
        return 'Lido';
      default:
        return 'Não Começado';
    }
  }
}
