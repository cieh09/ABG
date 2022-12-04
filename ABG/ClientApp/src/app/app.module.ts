import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';;
import { GameListComponent } from './components/game-list/game-list.component'
import { SharedService } from './services/shared.service';;
import { GameDetailsComponent } from './components/game-details/game-details.component'
import { Routes } from '@angular/router';

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
    GameDetailsComponent ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,RouterModule.forRoot([
      // { path: 'game', component: GameListComponent },
      { path: 'game/:Game_id', component: GameDetailsComponent },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
      // { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent }
    ])
    // RouterModule.forRoot(routes),
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

