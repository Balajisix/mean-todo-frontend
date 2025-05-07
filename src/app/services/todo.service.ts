import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  _id?: string;
  title: string;
  completed: boolean;
  deadline?: Date;
  createdAt?: string;  
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/todos';
  // private apiUrl = 'https://mean-todo-backend.vercel.app/api/todos';

  constructor(private http: HttpClient) { }

  // Helper method to get authorization headers with token from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo, { headers: this.getAuthHeaders() });
  }

  updateTodo(id: string, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo, { headers: this.getAuthHeaders() });
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
