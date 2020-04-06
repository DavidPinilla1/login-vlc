import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: object;
  constructor(public httpClient: HttpClient) { }
  login(user: object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/users/login', user);
  }
  setUser(user: object) {
    this.user = user
  }
  getInfo(token: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/users/info',{
      headers: {
        authorization: token
      }
    });
  }
  logout(token: string){
    return this.httpClient.get('http://localhost:3000/users/logout',{
      headers: {
        authorization: token
      }
    });
  }
}
