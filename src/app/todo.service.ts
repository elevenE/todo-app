import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {

  constructor() { }

  addTodo(): void {
    console.log('added');
  }

}
