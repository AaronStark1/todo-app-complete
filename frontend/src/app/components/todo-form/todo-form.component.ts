import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todoForm!: FormGroup;
  isEditMode = false;
  todoId?: number;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.todoId = +params['id'];
        this.loadTodo();
      }
    });
  }

  initForm(): void {
    const today = new Date().toISOString().split('T')[0];
    
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dueDate: ['', [Validators.required, this.futureDateValidator]],
      status: ['pending', Validators.required]
    });
  }

  futureDateValidator(control: any) {
    if (!control.value) {
      return null;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(control.value);
    return selectedDate >= today ? null : { pastDate: true };
  }

  loadTodo(): void {
    if (this.todoId) {
      this.loading = true;
      this.todoService.getTodoById(this.todoId).subscribe({
        next: (todo) => {
          this.todoForm.patchValue({
            title: todo.title,
            description: todo.description,
            dueDate: todo.dueDate,
            status: todo.status
          });
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading todo:', error);
          this.errorMessage = 'Failed to load todo';
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.todoForm.controls;
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.errorMessage = 'User not authenticated';
      return;
    }

    const todoData: Todo = {
      ...this.todoForm.value,
      userId: userId
    };

    this.loading = true;

    if (this.isEditMode && this.todoId) {
      todoData.id = this.todoId;
      this.todoService.updateTodo(this.todoId, todoData).subscribe({
        next: () => {
          this.router.navigate(['/todos']);
        },
        error: (error) => {
          console.error('Error updating todo:', error);
          this.errorMessage = 'Failed to update todo';
          this.loading = false;
        }
      });
    } else {
      this.todoService.createTodo(todoData).subscribe({
        next: () => {
          this.router.navigate(['/todos']);
        },
        error: (error) => {
          console.error('Error creating todo:', error);
          this.errorMessage = 'Failed to create todo';
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/todos']);
  }
}
