import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url: string = 'https://demo.credy.in/api/v1/maya/movies/';
  constructor(private http: HttpClient) { }

  getAllMovies() {
    return this.http.get(this.url);
  }

  getAllMoviesNext(url1: string) {
    return this.http.get(url1);
  }

}
