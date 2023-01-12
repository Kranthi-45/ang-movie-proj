import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeSharedService {

  constructor() { }
  checkingThemeOnLoad() {
    let checkBox = document.querySelector("#switchMode") as HTMLInputElement | null;
    var isDark = localStorage.getItem("isDark");
    if (isDark == "true") {
      document.querySelectorAll("body").forEach(element => {
        element.classList.add('dark-theme');
        if (checkBox != null) {
          checkBox.checked = true;
        }
      });
    } else {
      document.querySelectorAll("body").forEach(element => {
        element.classList.remove('dark-theme');
        if (checkBox != null) {
          checkBox.checked = false;
        }
      });
    }
  }
}
