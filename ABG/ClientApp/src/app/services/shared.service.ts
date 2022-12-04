import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../common/game';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  game: Game = new Game;
  private baseUrl = 'https://localhost:5001/api'; 

  constructor(private httpClient: HttpClient) { 
  }

  getGameList(): Observable<any[]>{
    return this.httpClient.get<any>(this.baseUrl + '/game');
  }

  getSingleGameContext(gameId: number): Observable<Game> {
    // const gameUrl = `${this.baseUrl}/game/${gameId}`;
    console.log("running" + gameId);
    return this.httpClient.get<Game>(this.baseUrl + '/game/' + gameId);
  }
}
