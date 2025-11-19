import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: false,
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss'
})
export class BookCard {

  @Input() book!: Book;

}
