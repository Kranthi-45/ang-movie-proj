import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = 'https://demo.credy.in/api/v1/usermodule/login/';
  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post(this.url, user);
  }
}