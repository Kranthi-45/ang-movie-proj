import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url: string = 'https://demo.credy.in/api/v1/maya/movies/';
  headerOptions:any = {}
  
  constructor(private http: HttpClient) { 
    this.getLoginToken();
  }

  getLoginToken() {
    this.headerOptions = {
      headers: {
        Authorization: 'Token ' + localStorage.getItem("token")
      }
    }
  }

  getAllMovies() {
    return this.http.get(this.url,this.headerOptions);
  }

  getAllMoviesNext(url1: string) {
    return this.http.get(url1,this.headerOptions);
  }

}
