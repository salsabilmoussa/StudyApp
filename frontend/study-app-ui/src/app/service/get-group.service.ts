import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetGroupService {
  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllGroups() {
    return this.http.get(this.url + 'groupe/group');
  }
  upDateGroup(groupe : any) {
  return this.http.put(`${this.url}groupe/group/${groupe.id}`, groupe);
  }
  getGroupeById(id : string) {
    return this.http.get(`${this.url}groupe/group/${id}`);
  }
  createGroupe(groupe : any){
    return this.http.post(`${this.url}groupe/group`, groupe);
  }
  deleteGroupe(id : string){
    return this.http.delete(`${this.url}groupe/group/${id}`);
  }
}