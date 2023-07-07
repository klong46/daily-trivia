export class Question{
    id?: string
    date: Date;
    category: string;
    text: string;
    answer: string;
    order_num?: number;
    difficulty?: number;
    points?: number;
    note?: string;
    numRight: number = 0;
    numWrong: number = 0;
    constructor(category: string, text: string, answer: string){
        this.category = category;
        this.text = text;
        this.answer = answer;
        this.date = new Date();
    }
}