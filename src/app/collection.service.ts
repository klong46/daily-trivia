import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from "rxjs";
import { QUESTION_LIST } from "./constants";
import { Question } from "./question";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private category: string = '';
  private triviaList: Question[] = [];

  constructor(private store: AngularFirestore){};

  async fetchTrivia(){
    let questionList = this.store.collection(this.getQuestionColName()).valueChanges({ idField: 'id' }) as Observable<Question[]>;
    this.category = await this.setCategory(questionList);
    this.triviaList = await this.setTriviaList(questionList);
  }

  getCollectionDate(): string {
    let todaysDate = new Date();
    return todaysDate.getMonth() + '-' + todaysDate.getDate() + '-' + todaysDate.getFullYear();
  }

  getQuestionColName(): string {
    return QUESTION_LIST + ' - ' + this.getCollectionDate();
  }

  async setTriviaList(questionList: Observable<Question[]>) {
    return await firstValueFrom(questionList);
  }

  async setCategory(questionList: Observable<Question[]>) {
    let qListForCat = await firstValueFrom(questionList);
    return (qListForCat[0] && qListForCat[0].category) ? qListForCat[0].category : '';
  }

  getTriviaList(){
    return this.triviaList;
  }

  getCategory(){
    return this.category;
  }

  updateResults(){
    for(let i = 0; i < this.triviaList.length; i++){
      let question = this.triviaList[i];
      this.store.collection(this.getQuestionColName()).doc(question.id).update(question);
    }
  }
}
