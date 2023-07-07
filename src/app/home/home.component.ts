import { Component, OnInit } from '@angular/core';
import { STORAGE_KEY } from '../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eligible: boolean = false;

  ngOnInit(): void {
    let today: string = new Date().toLocaleDateString();
    if (localStorage.getItem(STORAGE_KEY) !== today) {
      this.eligible = true;
    }
  }
}
