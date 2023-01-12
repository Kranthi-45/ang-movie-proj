import { Component, OnInit } from '@angular/core';
import { ThemeSharedService } from '../services/theme-shared.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private ts: ThemeSharedService) { }

  ngOnInit(): void {
    this.ts.checkingThemeOnLoad();
  }

}
