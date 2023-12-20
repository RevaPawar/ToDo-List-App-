import { Component, OnInit } from '@angular/core';
import { Todo } from "../../Todo";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  localItem: string | null = null;
  todos: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
    this.retrieveFromLocalStorage();
  }

  private retrieveFromLocalStorage(): void {
    this.localItem = localStorage.getItem("todos");
    if (this.localItem !== null) {
      this.todos = JSON.parse(this.localItem);
    } else {
      this.todos = [];
    }
  }

  deleteTodo(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.updateLocalStorage();
  }

  toggleTodo(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos[index].active =!this.todos[index].active;
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}
