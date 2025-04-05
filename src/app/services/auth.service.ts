import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://mean-todo-backend.vercel.app/api'; // your working backend URL
  // private apiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {}

  // Register user
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Login user
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Store token after login
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Check if token exists
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Remove token on logout
  logout(): void {
    localStorage.removeItem('token');
  }

  // Get token if needed for headers
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}