import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommentsService } from '../service/comments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comment } from './comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  postId: string = '';
  commentsForm: FormGroup
  comments: Comment[] = [];

  constructor(private dialogRef: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private commentService: CommentsService, private matSnackBar: MatSnackBar) {
    this.postId = this.data.postId;
    this.commentsForm = new FormGroup({
      comment: new FormControl(''),
    });

  }

  ngOnInit(): void {
    this.getComments();
  }

  // Fonction appelée lorsque l'utilisateur clique sur le bouton "x" ou en dehors du modal
  closeWithX(): void {
    this.dialogRef.close();
  }

  postComment() {
    const comment = this.commentsForm.get('comment')?.value;
    const commentDto = {
      "commentText": comment,
      "authorId": "authorId"
    }

    this.commentService.postComment(commentDto, this.postId).subscribe(() => {
      this.matSnackBar.open("Comment Posted Successfully", "OK");

      this.commentsForm.get('comment')?.reset();
      this.getComments();
    })
  }

  getComments() {
    this.commentService.getAllComments(this.postId).subscribe(data => {
      this.comments = data;
    });
  }


}
