import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksPage } from '../pages/books-page/books-page';
import { BookDetails } from '../pages/book-details/book-details';

const routes: Routes = [
  { path: '', redirectTo: '/meus-livros', pathMatch: 'full' },
  { path: 'meus-livros', component: BooksPage },
  { path: 'livro/:id', component: BookDetails },
  { path: 'estatisticas', component: BooksPage }, // Temporariamente usando BooksPage
  { path: 'progresso-anual', component: BooksPage } // Temporariamente usando BooksPage
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
