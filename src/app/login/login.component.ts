import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: any;
  status: any;
  unamePattern = "[a-zA-Z0-9]+";
  userDetails: any;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private ls: LoginService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  ngOnInit(): void {
    let checkBox = document.querySelector("#flexSwitchCheckDefault") as HTMLInputElement | null;
    var isDark = localStorage.getItem("isDark");
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
        }
        if (checkBox != null) {
          checkBox.checked = false;
        }
      });
    }
  }

  get f() {
    return this.loginForm.controls;
  }
  login() {
    this.isLoading = true;
    var username = this.f.username.value;
    var password = this.f.password.value;
    var userObj = {
      "username": username,
      "password": password
    }
    this.ls.login(userObj).subscribe((data) => {
      this.userDetails = data
      if (this.userDetails.is_success) {
        localStorage.setItem("token", this.userDetails.data.token);
        console.log("User successfully logged In...");
        this.router.navigate(['/admin']);
        this.status = false;
        this.isLoading = false;
      }
    }, (error) => {
      localStorage.removeItem("token");
      console.log("---------------Invalid Credentials------------");
      if (!error.error.is_success && error.error.error.code === "invalid_login_credentials") {
        console.log("User Password is Incorrect...");
        this.status = true;
      } else {
        console.log("User doesn't exits in our database.");
        this.status = true;
      }
      console.log(error);
      this.isLoading = false;
    });
  }
  
  error(){
    this.status = false;
  }
}











