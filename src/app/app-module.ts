import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { App } from './app';
import { ComponentsModule } from './components/components-module';
import { BookCard } from './components/book-card/book-card';
import { AppRoutingModule } from './routes/app-routing-module';
import { PagesModule } from './pages/pages-module';

@NgModule({
  declarations: [
    App  
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    AppRoutingModule,
    PagesModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
