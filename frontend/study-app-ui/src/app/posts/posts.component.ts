import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from './post';
import { CommentsComponent } from '../comments/comments.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts()
      .subscribe(posts => {
        this.posts = posts.map(post => ({ ...post, isMenuHidden: true }));
      });
  }

  isImage(url: string): boolean {
    return url.toLowerCase().endsWith('.jpg') ||
      url.toLowerCase().endsWith('.jpeg') ||
      url.toLowerCase().endsWith('.png') ||
      url.toLowerCase().endsWith('.gif');
  }

  openCommentModal(postId: string): void {
    this.dialog.open(CommentsComponent, {
      data: { postId: postId }
    });
  }
  

  isDocument(url: string): boolean {
    return !this.isImage(url);
  }

  toggleMenu(post: Post): void {
    post.isMenuHidden = !post.isMenuHidden;
    // Masquer les menus des autres publications
    this.posts.filter(p => p !== post).forEach(p => p.isMenuHidden = true);
  }
}
