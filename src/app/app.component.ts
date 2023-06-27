import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Question } from './question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private store: AngularFirestore){}
  
  today: string = new Date().toLocaleDateString();
  category: string = '';
  collectionDate: string = this.getCollectionDate();
  questionList = this.store.collection(this.getCollectionName()).valueChanges({ idField: 'id' }) as Observable<Question[]>;

  ngOnInit(): void {
      this.setCategory();
  }

  getCollectionDate(): string{
    let todaysDate = new Date();
    return todaysDate.getMonth()+'-'+todaysDate.getDate()+'-'+todaysDate.getFullYear();
  }

  getCollectionName(): string{
    return 'questionList - '+this.collectionDate;
  }

  setCategory(){
    let qListForCat = this.questionList.subscribe(questions => {
      this.category = (questions[0] && questions[0].category) ? questions[0].category : '';
      qListForCat.unsubscribe();
    });
  }
}
