import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavBar } from './nav-bar/nav-bar';
import { BookCard } from './book-card/book-card';
import { ReadingStatsComponent } from './reading-stats/reading-stats';
import { NotStartedCardComponent } from './not-started-card/not-started-card';
import { ReadingCalendarComponent } from './reading-calendar/reading-calendar';

@NgModule({
  declarations: [
    NavBar,
    BookCard,
    ReadingStatsComponent,
    NotStartedCardComponent,
    ReadingCalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavBar,
    BookCard,
    ReadingStatsComponent,
    NotStartedCardComponent,
    ReadingCalendarComponent
  ]
})
export class ComponentsModule { }
