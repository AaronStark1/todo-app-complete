import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

import { AuthService } from './services/auth.service';
import { TodoService } from './services/todo.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    TodoService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
