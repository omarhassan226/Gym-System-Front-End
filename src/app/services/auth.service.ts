import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../components/navbar/navbar.component';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthSubject = new BehaviorSubject<boolean>(false);
  isAuth$ = this.isAuthSubject.asObservable();
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.isAuthSubject.next(!!this.token);
  }

  // token = localStorage.getItem('token');
  apiUrl = 'http://localhost:3000/api/';

  signup(data: any) {
    return this.http.post(this.apiUrl + 'signup', data);
  }

  login(data: any) {
    return this.http.post<any>(this.apiUrl + 'login', data).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthSubject.next(true);
        }
      })
    );
  }

  signOut() {
    this.isAuthSubject.next(false);
    return this.http.post(this.apiUrl + 'logout', null);
  }

  getUser(): Observable<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    console.log(token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(this.apiUrl + 'user', { headers });
  }
}
