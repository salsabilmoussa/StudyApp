import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from './post';
import { CommentsComponent } from '../comments/comments.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService, private dialog: MatDialog, private matSnackBar: MatSnackBar) {
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

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe(
      () => {
        this.matSnackBar.open("Post Deleted Successfully", "OK");
        // Rechargez la page après la suppression
        window.location.reload();
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression du post:', error);
        // Ajoutez ici la gestion des erreurs
      }
    );
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
