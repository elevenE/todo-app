import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newTodo: string;
  todos: string[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos = [];
  }

  addTodo() {
    if (!this.newTodo) { return; }

    this.todos.push(this.newTodo);

    this.newTodo = '';
  }

  removeTodo(todo: string) {
    const i = this.todos.findIndex(t => t === todo);

    if (i !== -1) {
      this.todos.splice(i, 1);
    }
  }
}
