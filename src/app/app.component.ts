import { OnInit, ViewEncapsulation } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ThemeSharedService } from './services/theme-shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'OneFin Movie Page';
  constructor(private ts: ThemeSharedService) { }

  @ViewChild(LoginComponent) private myChild!: LoginComponent;

  ngOnInit() {
    this.ts.checkingThemeOnLoad();
  }
  toggleDarkTheme(): void {
    document.querySelectorAll("body").forEach(element => {
      element.classList.toggle('dark-theme');
    });
    if (document.querySelectorAll("body")[0].classList.contains('dark-theme')) {
      localStorage.setItem("isDark", "true");
    } else {
      localStorage.removeItem("isDark");
    }
  }

}
