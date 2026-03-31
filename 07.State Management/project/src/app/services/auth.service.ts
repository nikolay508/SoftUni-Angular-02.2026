import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);

  isLoggedIn$ = this.loggedInSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(){
    this.checkStoredAuth();
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  get token(): string | null {
    return localStorage.getItem('authToken');
  }

  login(username: string = 'cosmonaut_508131'): void {
    const fakeToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiY29zbW9uYXV0Iiwicm9sZSI6ImFzdHJvbmF1dCJ9.demo';

    const user: User = {
      id: 1,
      username: username,
      email: `${username}@space.galaxy`,
      role: 'astronaut',
    };

    localStorage.setItem('authToken', fakeToken);
    localStorage.setItem('user', JSON.stringify(user));

    this.userSubject.next(user);
    this.loggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    this.userSubject.next(null);
    this.loggedInSubject.next(false);
  }

  private checkStoredAuth(): void {
    const token = localStorage.getItem('authToken');
    const userJson = localStorage.getItem('user');

    if(token && userJson){
      try {
        const user = JSON.parse(userJson) as User;
        this.userSubject.next(user);
        this.loggedInSubject.next(true);
      } catch {
        this.logout();
      }
    }
  }
}
