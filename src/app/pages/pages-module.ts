import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPage } from './books-page/books-page';
import { ComponentsModule } from '../components/components-module';
import { BookDetails } from './book-details/book-details';

@NgModule({
  declarations: [
    BooksPage,
    BookDetails
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class PagesModule { }
