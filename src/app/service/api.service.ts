import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/query-data/${id}`);
  }

  integrarDados(): Observable<any> {
    return this.http.post(`${this.apiUrl}/integrate-data/`, {});
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  static users = [
    {
      id: '1',
      name: 'Teste-Safra',
      password: 'teste@123',
      email: 'fulano@example.com',
      gender: 'masculino',
      age: 30
    },
    {
      id: '2',
      name: 'Teste-Safra2',
      password: 'teste@1234',
      email: 'beltrano@example.com',
      gender: 'feminino',
      age: 25
    }
  ];
}
