import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from 'src/app/Models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'Application/Json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosUrl: string = "https://jsonplaceholder.typicode.com/todos";
  private limitTodos: string = "?_limit=6";

  constructor(private http:HttpClient) { }

  // Get Todo
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.limitTodos}`);
  }

  // Toggle todo
  toggleCompleted(todo: Todo):Observable<any> {
    return this.http.put(`${this.todosUrl}/${todo.id}`, todo, httpOptions);
  }

  // Delete Todo
  deleteTodo(todo: Todo): Observable<Todo> {
    return this.http.delete<Todo>(`${this.todosUrl}/${todo.id}`, httpOptions);
  }

  // Add Todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.todosUrl}`, todo, httpOptions);
  }
}
