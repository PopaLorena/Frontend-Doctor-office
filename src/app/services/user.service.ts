import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user';
import { Router } from '@angular/router';


@Injectable()
export class UserService {
 isLogin: boolean;
 
 //username: Subject<string>= new Subject();
 
 get username(): string {
  return localStorage.getItem('username') || 'unknown';
}
set username(value: string) {
  localStorage.setItem('username', value);
}

loggedInUser: BehaviorSubject<string> = new BehaviorSubject(this.username);

 get token(): string {
   return localStorage.getItem('token');
  }
  set token(value: string) {
    localStorage.setItem('token', value);
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  loggedIn(){
return !! localStorage.getItem('token');
  }

  saveUser(username: string) {
    localStorage.setItem('username', username);
    this.loggedInUser.next(username);
  }

  removeAuthorization() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['login']);
  }

  saveToken(username: string, password: string) {
    const generatedToken = `Basic ${btoa(username + ':' + password)}`;
    localStorage.setItem('token', generatedToken);
    this.token = generatedToken;
  }
  
  getUsers(): Observable<User[]> {
    const url = 'http://localhost:8888/user';
    return this.httpClient.get(url) as Observable<User[]>;
  }

  addUser(object: User): Observable<User> {
    const url = 'http://localhost:8888/user/create';
    return this.httpClient.post(url, object) as Observable<User>;
  }
  // removeAuthority():void{
  // localStorage.removeItem('token');
  // }
}