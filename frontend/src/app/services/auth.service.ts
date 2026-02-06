import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          this.currentUser = users[0];
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUserId(): number | null {
    return this.currentUser?.id || null;
  }
}
