import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newTodo: string;
  newTodoPriority: string;

  todos: TodoItem[];


  priorityCount: any;
  multiplePriorities: any;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos = [];
  }

  addTodo() {
    if (!this.newTodo || !this.newTodoPriority) { return; }

    const todoItem = new TodoItem(this.newTodo, parseInt(this.newTodoPriority, 0));
    this.todos.push(todoItem);

    this.newTodo = '';
    this.newTodoPriority = ''
  }

  removeTodo(todo: string) {
    const i = this.todos.findIndex(t => t.name === todo);

    if (i !== -1) {
      this.todos.splice(i, 1);
    }
  }

  getMultiplePriorities(): string[] {
    this.priorityCount = {};
    this.todos.forEach(t => {
      if (this.priorityCount.hasOwnProperty(t.priority)) {
        this.priorityCount[t.priority]++;
      } else {
        this.priorityCount[t.priority] = 1;
      }
    });

    // O (n)

    this.multiplePriorities = {};
    for (const priority in this.priorityCount) {
      if (this.priorityCount.hasOwnProperty(priority)) {
        if (this.priorityCount[priority] > 1) {
          this.multiplePriorities[priority] = this.priorityCount[priority];
        }
      }
    }

    // O (n)

    // O (n + n) => O(n)

    return Object.keys(this.multiplePriorities);
  }

  getMissingPriorities(): number[] {
    const prioritieisInt = Object.keys(this.priorityCount).map(p => parseInt(p, 10)); // O(n)
    prioritieisInt.sort((a, b) => a - b); // O(n log(n))

    const lowestPriority = prioritieisInt[0];

    const missingPriorities = [];
    for (let i = 1; i < lowestPriority; i++) { // O (n)
      missingPriorities.push(i);
    }

    // O (n) + Θ(n log(n)) + O (n)

    return missingPriorities;
  }
}

class TodoItem {
  name: string;
  priority: number;

  constructor(name: string, priority: number) {
    this.name = name;
    this.priority = priority;
  }
}
