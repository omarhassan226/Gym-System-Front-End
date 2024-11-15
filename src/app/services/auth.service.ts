import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../components/navbar/navbar.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // token = localStorage.getItem('token');
  apiUrl = 'http://localhost:3000/api/';

  signup(data: any) {
    return this.http.post(this.apiUrl + 'signup', data);
  }

  login(data: any) {
    return this.http.post(this.apiUrl + 'login', data);
  }

  signOut() {
    return this.http.post(this.apiUrl + 'logout', null);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl + 'user');
  }
}
