export const READING_INTENSITY = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  VERY_HIGH: 4
} as const;

export const PAGES_THRESHOLDS = {
  LOW: 5,
  MEDIUM: 15,
  HIGH: 30
} as const;

export const MESSAGES = {
  CONFIRM_CANCEL_READING: 'Tem certeza que deseja cancelar a leitura? Todo o progresso será perdido.',
  READING_STARTED: 'Leitura iniciada!',
  READING_CANCELLED: 'Leitura cancelada',
  BOOK_COMPLETED: 'Parabéns! Você concluiu o livro!',
  ERROR_LOADING_BOOK: 'Erro ao carregar livro'
} as const;
