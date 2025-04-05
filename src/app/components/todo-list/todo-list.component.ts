import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service';

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

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = { title: this.newTodoTitle.trim(), completed: false };
      this.todoService.addTodo(newTodo).subscribe((todo) => {
        this.todos.push(todo);
        this.newTodoTitle = '';
      });
    }
  }

  toggleCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
    if (todo._id) {
      this.todoService.updateTodo(todo._id, todo).subscribe();
    }
  }

  deleteTodo(todo: Todo): void {
    if (todo._id) {
      this.todoService.deleteTodo(todo._id).subscribe(() => {
        this.todos = this.todos.filter((t) => t._id !== todo._id);
      });
    }
  }

  getCompletionPercentage(): number {
    if (this.todos.length === 0) return 0;
    return (this.getCompletedCount() / this.todos.length) * 100;
  }

  // Helper methods to avoid expressions in the template
  getCompletedCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  getStatusIconClass(todo: Todo): string {
    return todo.completed ? 'completed-icon' : 'pending-icon';
  }

  getButtonText(todo: Todo): string {
    return todo.completed ? '↩️ Undo' : '✅ Done';
  }
}