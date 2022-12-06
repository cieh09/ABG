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
import { RegisterComponent } from './components/register/register.component';
import { MembershipComponent } from './components/membership/membership.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { FriendComponent } from './components/friend/friend.component';
import { LoginComponent } from './components/login/login.component';;
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component'

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GameListComponent,
    GameDetailsComponent ,
    RegisterComponent,
    FriendComponent,
    ArchiveComponent,
    MembershipComponent,
    LoginComponent,
    ShoppingCartComponent,],
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

