import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  newTodoDeadline: string = '';
  
  // ← New property for the search term
  searchTerm: string = '';

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos()
      .subscribe((todos) => (this.todos = todos));
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;

    const newTodo: Todo = {
      title: this.newTodoTitle.trim(),
      completed: false,
      deadline: this.newTodoDeadline
        ? new Date(this.newTodoDeadline)
        : undefined
    };

    this.todoService.addTodo(newTodo)
      .subscribe((todo) => {
        this.todos.push(todo);
        this.newTodoTitle = '';
        this.newTodoDeadline = '';
      });
  }

  toggleCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
    if (todo._id) {
      this.todoService.updateTodo(todo._id, todo)
        .subscribe();
    }
  }

  deleteTodo(todo: Todo): void {
    if (todo._id) {
      this.todoService.deleteTodo(todo._id)
        .subscribe(() => {
          this.todos = this.todos.filter(t => t._id !== todo._id);
        });
    }
  }

  getCompletionPercentage(): number {
    if (this.todos.length === 0) return 0;
    return (this.getCompletedCount() / this.todos.length) * 100;
  }

  getCompletedCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  getStatusIconClass(todo: Todo): string {
    return todo.completed ? 'completed-icon' : 'pending-icon';
  }

  getButtonText(todo: Todo): string {
    return todo.completed ? '↩️ Undo' : '✅ Done';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /** 
   * ← New getter: filters todos by title, case‑insensitive 
   */
  get filteredTodos(): Todo[] {
    if (!this.searchTerm) {
      return this.todos;
    }
    const term = this.searchTerm.trim().toLowerCase();
    return this.todos.filter(todo =>
      todo.title.toLowerCase().includes(term)
    );
  }
}
