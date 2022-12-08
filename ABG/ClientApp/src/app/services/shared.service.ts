import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from '../common/friend';
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

  validateUserInfo(userInfo): Observable<User>{
    return this.httpClient.post<User>(this.baseUrl + '/User/GetUserInfo', userInfo);
  }

  validateUserInfoById(userInfo): Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + '/User/GetUserInfoById?id=' + userInfo);
  }

  writeNewUserInfo(userInfo): Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + '/User/WriteNewUserInfo', userInfo);
  }

  getGamesByUserId(user_id: number): Observable<any[]>{
    console.log("running getGamesByUserId" + user_id);
    return this.httpClient.get<any>(this.baseUrl + '/Game/GetAllGamesByUserId?user_id=' + user_id);
  }

  getVaildMembership(id: number): Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + "/User/GetUserPremiumId?id=" + id);
  }

  updateUser(user: User): Observable<HttpResponse<any>>{
    return this.httpClient.put<HttpResponse<any>>(this.baseUrl + '/User/UpdateUser', user);
  }
  
  getFriendList(user_id: number): Observable<number[]>{
    return this.httpClient.get<number[]>(this.baseUrl + '/Friend/GetFriends?user_id=' + user_id);
  }

  deleteUserFriend(friend: Friend): Observable<HttpResponse<any>>{
    return this.httpClient.put<HttpResponse<any>>(this.baseUrl + '/Friend/DeleteFriend', friend);
  }
}
