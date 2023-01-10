import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css'],
  providers: []
})
export class TopmenuComponent implements OnInit {

  logginUser: any;
  status: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.logginUser = localStorage.getItem("token");
    this.status = this.logginUser ? "Logout" : "Login";
  }

  loginLogout() {
    this.router.navigate(['']);
    localStorage.removeItem("token");
  }

}
