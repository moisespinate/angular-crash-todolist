import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/Models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos:Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todosResponse => this.todos = todosResponse);
  }

  deleteTodo(todo:Todo){
    // Deleting on UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Deleting on Server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todoResponse => { 
      this.todos.push(todoResponse);
    });
  }
}
