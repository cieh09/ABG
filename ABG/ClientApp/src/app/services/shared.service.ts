import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../common/game';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  storage: Storage = sessionStorage;
  game: Game = new Game;
  private baseUrl = 'https://localhost:5001/api'; 

  constructor(private httpClient: HttpClient) { 
  }

  getGameList(): Observable<any[]>{
    return this.httpClient.get<any>(this.baseUrl + '/Game');
  }

  getSingleGameContext(gameId: number): Observable<any> {
    console.log("running" + gameId);
      return this.httpClient.get<any>(this.baseUrl + '/Game/GetSingleGameContext?id=' + gameId);
  }

  validateUserInfo(userInfo): Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + '/User/GetUserInfo', userInfo);
  }

  writeNewUserInfo(userInfo): Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + '/User/WriteNewUserInfo', userInfo);
  }

  persistUserInfo(){
    // this.storage.setItem("User", JSON.stringify(this.loginForm.value));
  }

  updateUser(user: User): Observable<HttpResponse<any>>{
    return this.httpClient.put<HttpResponse<any>>(this.baseUrl + '/User/UpdateUser', user);
  }
}
