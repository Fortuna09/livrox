export interface ReadingActivity {
  date: string; // formato ISO: YYYY-MM-DD
  pagesRead: number;
  note?: string;
}

export type ReadingStatus = 'not-started' | 'reading' | 'completed';

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImageUrl: string;
  year?: number;
  genre?: string;
  totalPages?: number;
  pagesRead?: number;
  isCompleted?: boolean;
  readingStatus?: ReadingStatus;
  readingHistory?: ReadingActivity[];
  startReadingDate?: string; // data em que iniciou a leitura
}
