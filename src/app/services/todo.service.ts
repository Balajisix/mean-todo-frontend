import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//
export interface Todo {
  _id?: string;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // private apiUrl = 'http://localhost:3000/api/todos';
  private apiUrl = 'https://mean-todo-backend.vercel.app/api/todos'

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    console.log('Fetching from:', this.apiUrl);
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    console.log('Fetching from:', this.apiUrl);
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(id: string, todo: Todo): Observable<Todo> {
    console.log('Fetching from:', this.apiUrl);
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  deleteTodo(id: string): Observable<any> {
    console.log('Fetching from:', this.apiUrl);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
