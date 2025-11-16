import { Component, Input } from '@angular/core';
import { MedalType } from '../../models/book.model';
import { MEDALS } from '../../constants/achievements.constants';

@Component({
  selector: 'app-book-medals',
  standalone: false,
  templateUrl: './book-medals.html',
  styleUrls: ['./book-medals.scss']
})
export class BookMedalsComponent {
  @Input() medals: MedalType[] = [];
  @Input() currentProgress: number = 0;
  @Input() hasTrophy: boolean = false;

  getMedalConfig(medalType: MedalType) {
    return MEDALS[medalType];
  }

  getMedalsList(): MedalType[] {
    return this.medals.length > 0 ? this.medals : ['none'];
  }
}
