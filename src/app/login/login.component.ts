import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ThemeSharedService } from '../services/theme-shared.service';
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
  errorMessage: String = "";
  constructor(private fb: FormBuilder, private router: Router, private ls: LoginService, private ts: ThemeSharedService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  ngOnInit(): void {
    this.ts.checkingThemeOnLoad();
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
        this.errorMessage = "Entered Password is Incorrect."
        this.status = true;
      } else {
        console.log("User doesn't exits in our database.");
        this.errorMessage = "Entered User doesn't exists in our Database."
        this.status = true;
      }
      console.log(error);
      this.isLoading = false;
    });
  }

  error() {
    this.status = false;
  }
}











