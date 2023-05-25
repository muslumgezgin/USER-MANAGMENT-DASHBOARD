import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiHost: string = 'http://localhost:3000/users';

  constructor(private client: HttpClient) { }

  getUsers(): Observable<User[]> {
    let url = `${this.apiHost}`;
    return this.client.get<any[]>(url);
  }

  getUserById(userId: number): Observable<User> {
    let url = `${this.apiHost}/${userId}`;
    return this.client.get<any>(url);
  }

  createUser(user: User): Observable<User> {
    let url = `${this.apiHost}`;
    return this.client.post<any>(url, user);
  }

  updateUser(user: User): Observable<User> {
    let url = `${this.apiHost}/${user.id}`;
    return this.client.put<User>(url, user);
  }

  deleteUser(userId: number): Observable<boolean> {
    let url = `${this.apiHost}/${userId}`;
    return this.client.delete<boolean>(url);
  }
}
