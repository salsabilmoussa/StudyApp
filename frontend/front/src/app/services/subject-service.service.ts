import { Injectable } from '@angular/core';
import { HttpClient ,HttpEvent,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService {
  private baseUrl = 'http://localhost:8082/api/subjects';
  constructor(private http: HttpClient) { }

// Create a new subject
createSubject(subject: Subject): Observable<Subject> {
  return this.http.post<Subject>(this.baseUrl, subject);
}

// Get all subjects
getAllSubjects(): Observable<Subject[]> {
  return this.http.get<Subject[]>(this.baseUrl);
}

// Get a single subject by ID
getSubjectById(id: number): Observable<Subject> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.get<Subject>(url);
}

// Update a subject by ID
updateSubject(id: number, subject: Subject): Observable<Subject> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.put<Subject>(url, subject);
}

// Delete a subject by ID
deleteSubject(id: number): Observable<void> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.delete<void>(url);
}
}
