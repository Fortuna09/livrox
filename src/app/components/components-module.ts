import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBar } from './nav-bar/nav-bar';
import { BookCard } from './book-card/book-card';

@NgModule({
  declarations: [
    NavBar,
    BookCard
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavBar,
    BookCard
  ]
})
export class ComponentsModule { }
