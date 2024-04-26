import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Post } from '../posts/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }


  uploadPost(text: string, fileEntry: File): Observable<any> {
    const formData = new FormData()
    formData.append('postText', text);
    formData.append('file', fileEntry, fileEntry.name);
    // HTTP post call to upload the post
    return this.httpClient.post("http://localhost:8080/api/posts", formData);

  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:8080/api/posts/${postId}`);
  }


  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>("http://localhost:8080/api/posts");
  }
}
