import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css'],
  providers: []
})
export class TopmenuComponent implements OnInit{

  logginUser: any;
  status: any;
    
  @ViewChild('statusRef') statusRef!: ElementRef<HTMLInputElement>;
  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.logginUser = localStorage.getItem("token");
    this.status = this.logginUser ? "Logout" : "Login";
  }

  loginLogout() {
    let userStatus = this.statusRef.nativeElement.textContent?.trim() ;
    if(userStatus == 'Login'){
      this.router.navigate(['']);
    }else{
      localStorage.removeItem("token")
      this.router.navigate(['logout']);
    }
  }
}
