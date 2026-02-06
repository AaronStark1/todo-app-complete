import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;
  userName = '';

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.userName = user?.name || 'User';
    this.loadTodos();
  }

  loadTodos(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.loading = true;
      this.todoService.getTodosByUser(userId).subscribe({
        next: (todos) => {
          this.todos = todos.sort((a, b) => 
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          );
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading todos:', error);
          this.loading = false;
        }
      });
    }
  }

  addTodo(): void {
    this.router.navigate(['/todos/add']);
  }

  editTodo(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/todos/edit', id]);
    }
  }

  deleteTodo(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.loadTodos();
        },
        error: (error) => {
          console.error('Error deleting todo:', error);
          alert('Failed to delete todo');
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      default:
        return 'status-pending';
    }
  }

  isOverdue(dueDate: string): boolean {
    return new Date(dueDate) < new Date() && this.todos.find(t => t.dueDate === dueDate)?.status !== 'completed';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
