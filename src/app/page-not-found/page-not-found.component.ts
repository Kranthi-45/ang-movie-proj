import { Component, OnInit } from '@angular/core';
import { ThemeSharedService } from '../services/theme-shared.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private ts: ThemeSharedService) { }

  ngOnInit(): void {
    this.ts.checkingThemeOnLoad();
  }

}
