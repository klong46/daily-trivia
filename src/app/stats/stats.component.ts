import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{
  triviaList: Question[] = [];

  constructor(private collection: CollectionService){}

  ngOnInit(): void {
    this.initPage();
  }

  async initPage(){
    await this.collection.refreshData();
    this.triviaList = this.collection.getTriviaList();
  }
}
