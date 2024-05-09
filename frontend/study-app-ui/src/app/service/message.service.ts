import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = 'http://localhost:8080/';

  constructor(private http : HttpClient) { }

  createNewMessage(message : any){
    return this.http.post(this.url + 'messages/message', message );
  }
  getAllMessages(){
    return this.http.get(this.url + 'messages/message');
  }
}