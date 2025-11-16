import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPage } from './books-page/books-page';
import { ComponentsModule } from '../components/components-module';
import { BookDetails } from './book-details/book-details';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BooksPage,
    BookDetails
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule
  ]
})
export class PagesModule { }
