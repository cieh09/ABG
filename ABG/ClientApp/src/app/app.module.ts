import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';;
import { GameDetailsComponent } from './components/game-details/game-details.component'
import { GameListComponent } from './components/game-list/game-list.component'
import { SharedService } from './services/shared.service';;
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';;
import { RegisterComponent } from './components/register/register.component'

// const routes : Routes = [
//   { path: 'game/:Id', component: GameDetailsComponent },
//   { path: '', redirectTo: '/game', pathMatch: 'full' },
//   { path: '**', redirectTo: '/game', pathMatch: 'full' },
//   { path: '', component: HomeComponent, pathMatch: 'full' },
//   { path: 'counter', component: CounterComponent },
//   { path: 'fetch-data', component: FetchDataComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GameListComponent,
    GameDetailsComponent ,
    RegisterComponent],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [SharedService],
    bootstrap: [AppComponent]
})
export class AppModule { }

