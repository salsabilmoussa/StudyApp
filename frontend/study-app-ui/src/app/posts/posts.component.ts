import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from './post';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts()
      .subscribe(posts => {
        this.posts = posts;
      });
  }
  isImage(url: string): boolean {
    return url.toLowerCase().endsWith('.jpg') ||
      url.toLowerCase().endsWith('.jpeg') ||
      url.toLowerCase().endsWith('.png') ||
      url.toLowerCase().endsWith('.gif');
  }

  isDocument(url: string): boolean {
    return !this.isImage(url);
  }
}
