import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from "rxjs/operators";
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  search = "";
  searchNoRecords = false;
  movies: any;
  moviesList: any;
  refreshPage = false;
  page = 1;
  itemsPerPage = 10;
  totalItems: any;
  isLoading: boolean = false;
  searching: boolean = false;
  modalData: any = {
    title: "",
    description: "",
    genres: ""
  };

  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef;
  constructor(private ms: MovieService) {
  }
  ngOnInit(): void {
    let isDark = localStorage.getItem("isDark");
    let checkBox = document.querySelector("#flexSwitchCheckDefault") as HTMLInputElement | null;
    if (isDark == "true") {
      document.querySelectorAll("body").forEach(element => {
        if (!element.classList.contains("dark-theme")) {
          element.classList.add('dark-theme');
          if (checkBox != null) {
            checkBox.checked = true;
          }
        }
      });
    } else {
      document.querySelectorAll("body").forEach(element => {
        if (element.classList.contains("dark-theme")) {
          element.classList.remove('dark-theme');
          if (checkBox != null) {
            checkBox.checked = false;
          }
        }
      });
    }

    this.isLoading = true;
    this.getAllMovies();
    fromEvent(this.searchTerm.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , filter(res => res.length > 3 || res.length == 0)
      , debounceTime(250)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.searching = true;
      const result = this.moviesList.filter((obj: { title: string; }) => {
        return obj.title.includes(this.search);
      });
      this.isLoading = true;
      if (this.search != '') {
        if (result.length != 0) {
          this.moviesList = result;
          this.searchNoRecords = false;
          this.totalItems = result.length;
          this.isLoading = false;
          this.searching = false;
        } else {
          this.moviesList = [];
          this.searchNoRecords = true;
          this.totalItems = 0;
          this.isLoading = false;
          this.searching = false;
        }
      } else {
        this.getAllMovies();
        this.searchNoRecords = false;
        this.isLoading = false;
        this.searching = false;
      }
      this.isLoading = false;
    });
  }
  getAllMovies() {
    this.ms.getAllMovies().subscribe((data) => {
      this.movies = data;
      this.moviesList = this.movies.results
      this.totalItems = this.movies.count;
      this.refreshPage = false;
      this.isLoading = false;
    },
    (error) => {
      console.log("------------Error Occured Refresh the Page----------")
      this.refreshPage = true;
      this.isLoading = false;
    });
  }
  getNextMovies(page: any) {
    this.ms.getAllMoviesNext(`https://demo.credy.in/api/v1/maya/movies?page=${page}&size=${this.itemsPerPage}`).subscribe((data: any) => {
      this.movies = data;
      this.moviesList = this.movies.results;
      this.totalItems = this.movies.count;
    });
  }
  fnEdit(movie: any) {
    this.modalData = movie;
  }

  search1() {
    // this.isLoading = true;
  }

  refresh() {
    window.location.reload();
  }

}
