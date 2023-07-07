import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { Router } from '@angular/router';
import { STORAGE_KEY } from '../constants';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit{
  constructor(private router: Router, private collection: CollectionService){}
  
  category: string = '';
  triviaList: Question[] = [];
  answerInput: string = '';
  qIndex: number = 0;
  allAnswered: boolean = false;

  ngOnInit(): void {
    this.initPage();
  }

  async initPage(){
    await this.collection.refreshData();
    this.triviaList = this.collection.getTriviaList();
    this.category = this.collection.getCategory();
  }

  async submitAnswer(){
    let answer = this.answerInput;
    answer.toLowerCase().trim();
    let isCorrect = (answer === this.triviaList[this.qIndex].answer);
    isCorrect ? this.triviaList[this.qIndex].numRight++ : this.triviaList[this.qIndex].numWrong++;
    if(this.qIndex < this.triviaList.length-1){
      this.qIndex++;
    }else{
      this.finishTrivia();
    }
    this.answerInput = '';
  }

  finishTrivia(){
    this.allAnswered = true;
    this.collection.updateResults();
    this.router.navigate(['/home']);
    let today = new Date().toLocaleDateString();
    // localStorage.setItem(STORAGE_KEY,today);
  }
}
