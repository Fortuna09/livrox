import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books-page',
  standalone: false,
  templateUrl: './books-page.html',
  styleUrl: './books-page.scss',
})
export class BooksPage implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(){
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (error) => {
        console.error('Erro ao carregar livros:', error);
      }
    });
  }

}
