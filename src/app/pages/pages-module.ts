import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    RouterModule,
    ComponentsModule,
    FormsModule
  ]
})
export class PagesModule { }
