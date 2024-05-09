import { Injectable } from '@angular/core';
import { HttpClient ,HttpEvent,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

const baseUrl = 'http://localhost:8082/api/courses';
const teacherId='6603c997674aed336ceb4480';
const studentId='6603c964674aed336ceb447f';
@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(baseUrl);
  }

  get(id: any): Observable<Course> {
    return this.http.get<Course>(`${baseUrl}/${id}`);
  }
  addFiles(id:any,formData:FormData){
    return this.http.post<Course>(`${baseUrl}/${teacherId}/${id}`,formData);
  }
  getFile(id: any,name:string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${baseUrl}/${id}/${name}`,{
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  create(formData: FormData): Observable<HttpEvent<Course>> {
    return this.http.post<Course>(`${baseUrl}/${teacherId}`, formData,{
      reportProgress: true,
      observe: 'events'
    });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Course[]> {
    return this.http.get<Course[]>(`${baseUrl}?title=${title}`);
  }
}