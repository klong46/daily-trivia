import { Component, OnInit } from '@angular/core';
import { CollectionService } from './collection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 

  constructor(private collectionService: CollectionService){};

  ngOnInit(): void {
    this.collectionService.fetchTrivia();
  }



}
