import { Injectable } from '@angular/core';
import { HttpClient ,HttpEvent,HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { User } from '../models/user';

const baseUrl = 'http://localhost:8082/api/users';
const teacherId='6603c997674aed336ceb4480';
const studentId='6603c964674aed336ceb447f';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl)
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }
  update( data: User): Observable<any> {
    return this.http.put(`${baseUrl}/${studentId}`, data);
  }
  addFavorite(id: string, name: string): Observable<any> {
    return this.get(studentId).pipe(
      switchMap((user: User) => {
        user.favorites!.push(name);
        return this.update(user);
      })
    );
  }
}
