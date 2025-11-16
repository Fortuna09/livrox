import { MedalType } from '../models/book.model';

export interface MedalConfig {
  type: MedalType;
  name: string;
  icon: string;
  color: string;
  progressRequired: number; // porcentagem
}

export const MEDALS: Record<MedalType, MedalConfig> = {
  'none': {
    type: 'none',
    name: 'Sem Medalha',
    icon: '⚪',
    color: '#e0e0e0',
    progressRequired: 0
  },
  'bronze': {
    type: 'bronze',
    name: 'Bronze',
    icon: '🥉',
    color: '#cd7f32',
    progressRequired: 25
  },
  'silver': {
    type: 'silver',
    name: 'Prata',
    icon: '🥈',
    color: '#c0c0c0',
    progressRequired: 50
  },
  'gold': {
    type: 'gold',
    name: 'Ouro',
    icon: '🥇',
    color: '#ffd700',
    progressRequired: 75
  },
  'emerald': {
    type: 'emerald',
    name: 'Esmeralda',
    icon: '💎',
    color: '#50c878',
    progressRequired: 100
  },
  'platinum': {
    type: 'platinum',
    name: 'Platina',
    icon: '🏆',
    color: '#e5e4e2',
    progressRequired: 100
  }
};

export interface AchievementConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  medal: MedalType;
}

export const ACHIEVEMENT_CONFIGS: AchievementConfig[] = [
  {
    id: 'complete_book',
    name: 'Livro Completo',
    description: 'Complete 100% do livro',
    icon: '💎',
    medal: 'emerald'
  },
  {
    id: 'daily_reader',
    name: 'Leitor Diário',
    description: 'Leia todos os dias até terminar o livro',
    icon: '📅',
    medal: 'platinum'
  },
  {
    id: 'speed_reader',
    name: 'Leitor Veloz',
    description: 'Complete o livro em 30 dias ou menos',
    icon: '⚡',
    medal: 'platinum'
  }
];
