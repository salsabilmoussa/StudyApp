import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './comments/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
 

  constructor(private httpClient: HttpClient) { }

  postComment(commentDto: any, postId: string): Observable<any> {
    return this.httpClient.post("http://localhost:8080/api/posts/" + postId + "/comment", commentDto);
  }

  getAllComments(postId: string): Observable<Array<Comment>>{
    return this.httpClient.get<Comment[]>("http://localhost:8080/api/posts/" + postId + "/comment");
  }

}
