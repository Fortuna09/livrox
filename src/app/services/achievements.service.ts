import { Injectable } from '@angular/core';
import { Book, MedalType, Achievement } from '../models/book.model';
import { MEDALS, ACHIEVEMENT_CONFIGS } from '../constants/achievements.constants';
import { DateUtilsService } from './date-utils.service';

/**
 * Serviço responsável pela lógica de conquistas e medalhas
 * Segue os princípios:
 * - Single Responsibility: Apenas gerencia conquistas
 * - Open/Closed: Extensível através de ACHIEVEMENT_CONFIGS
 * - Dependency Inversion: Depende de abstrações (DateUtilsService)
 */
@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private static readonly MAX_SPEED_READER_DAYS = 30;

  constructor(private readonly dateUtils: DateUtilsService) {}

  /**
   * Obtém a medalha de progresso baseada na porcentagem
   * @param progress Porcentagem de progresso (0-100)
   * @returns Tipo de medalha correspondente
   */
  getProgressMedal(progress: number): MedalType {
    const medalEntries = Object.entries(MEDALS)
      .filter(([key]) => key !== 'none' && key !== 'platinum')
      .sort((a, b) => b[1].progressRequired - a[1].progressRequired);

    for (const [type, config] of medalEntries) {
      if (progress >= config.progressRequired) {
        return type as MedalType;
      }
    }

    return 'none';
  }

  /**
   * Verifica se o leitor manteve uma sequência diária de leitura
   * @param book Livro a ser verificado
   * @returns true se leu todos os dias, false caso contrário
   */
  checkDailyReadingStreak(book: Book): boolean {
    if (!this.hasValidReadingData(book)) {
      return false;
    }

    const readingDates = this.getReadingDatesSet(book);
    const expectedDates = this.getExpectedReadingDates(book.startReadingDate!);

    return this.hasAllExpectedDates(expectedDates, readingDates);
  }

  /**
   * Verifica se o livro foi completado dentro do prazo de leitura rápida
   * @param book Livro a ser verificado
   * @returns true se completou em 30 dias ou menos
   */
  checkSpeedReader(book: Book): boolean {
    if (!book.isCompleted || !book.startReadingDate) {
      return false;
    }

    const completionDate = this.getCompletionDate(book);
    const daysTaken = this.dateUtils.calculateDaysDifference(
      book.startReadingDate,
      completionDate
    );

    return daysTaken <= AchievementsService.MAX_SPEED_READER_DAYS;
  }

  /**
   * Atualiza e retorna todas as conquistas do livro
   * @param book Livro a ser atualizado
   * @param progress Progresso atual (0-100)
   * @returns Array de conquistas atualizadas
   */
  updateAchievements(book: Book, progress: number): Achievement[] {
    return [
      this.createCompleteBookAchievement(progress),
      this.createDailyReaderAchievement(book),
      this.createSpeedReaderAchievement(book)
    ];
  }

  /**
   * Obtém todas as medalhas conquistadas
   * @param book Livro a ser verificado
   * @param progress Progresso atual (0-100)
   * @returns Array de medalhas únicas conquistadas
   */
  getEarnedMedals(book: Book, progress: number): MedalType[] {
    const medals = new Set<MedalType>();

    const progressMedal = this.getProgressMedal(progress);
    if (progressMedal !== 'none') {
      medals.add(progressMedal);
    }

    const achievements = this.updateAchievements(book, progress);
    this.addPlatinumMedalsFromAchievements(achievements, medals);

    return Array.from(medals);
  }

  /**
   * Inicializa conquistas para um livro novo
   * @param book Livro a ser inicializado
   */
  initializeAchievements(book: Book): void {
    if (!book.achievements) {
      book.achievements = this.updateAchievements(book, 0);
    }
  }

  // Private helper methods

  private hasValidReadingData(book: Book): boolean {
    return !!(
      book.startReadingDate &&
      book.readingHistory &&
      book.readingHistory.length > 0
    );
  }

  private getReadingDatesSet(book: Book): Set<string> {
    return new Set(book.readingHistory!.map(h => h.date));
  }

  private getExpectedReadingDates(startDate: string): string[] {
    const start = new Date(startDate);
    const today = new Date(this.dateUtils.getTodayDate());
    const daysCount = Math.floor(
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

    return Array.from({ length: daysCount }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date.toISOString().split('T')[0];
    });
  }

  private hasAllExpectedDates(expectedDates: string[], readingDates: Set<string>): boolean {
    return expectedDates.every(date => readingDates.has(date));
  }

  private getCompletionDate(book: Book): string {
    if (book.readingHistory && book.readingHistory.length > 0) {
      return book.readingHistory[book.readingHistory.length - 1].date;
    }
    return this.dateUtils.getTodayDate();
  }

  private createCompleteBookAchievement(progress: number): Achievement {
    const config = ACHIEVEMENT_CONFIGS[0];
    const completed = progress >= 100;

    return {
      id: config.id,
      name: config.name,
      description: config.description,
      completed,
      medal: completed ? config.medal : undefined
    };
  }

  private createDailyReaderAchievement(book: Book): Achievement {
    const config = ACHIEVEMENT_CONFIGS[1];
    const completed = book.isCompleted ? this.checkDailyReadingStreak(book) : false;

    return {
      id: config.id,
      name: config.name,
      description: config.description,
      completed,
      medal: completed ? config.medal : undefined
    };
  }

  private createSpeedReaderAchievement(book: Book): Achievement {
    const config = ACHIEVEMENT_CONFIGS[2];
    const completed = this.checkSpeedReader(book);

    return {
      id: config.id,
      name: config.name,
      description: config.description,
      completed,
      medal: completed ? config.medal : undefined
    };
  }

  private addPlatinumMedalsFromAchievements(
    achievements: Achievement[],
    medals: Set<MedalType>
  ): void {
    achievements.forEach(achievement => {
      if (achievement.completed && achievement.medal === 'platinum') {
        medals.add('platinum');
      }
    });
  }
}
