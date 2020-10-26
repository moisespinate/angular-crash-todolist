import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/Models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  // This allows me to get a input property, in this case of the todo type
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-completed': this.todo.completed
    }

    return classes;
  }

  onToggle(todo):void {
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle Service
    this.todoService.toggleCompleted(todo).subscribe(todoResponse => console.log(todoResponse))
  }

  // We use EventEmitter and Output to create an event propagation to the
  // parent component for catch this generated event on the parent compoent and delete
  // all the Todos that are loaded on the todo.component. It's similar to the $emit of VueJS
  onDelete(todo): void {
    this.deleteTodo.emit(todo);
  }
}
