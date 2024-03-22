import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { PostService } from '../post.service';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.css']
})
export class UploadPostComponent {
  postText: string = '';
  showTextField: boolean = true;
  showUploadComponent: boolean = false;
  public files: NgxFileDropEntry[] = [];
  fileUploaded: boolean= false;
  fileEntry: FileSystemFileEntry | undefined;
  uploadButtonText: string = '';
  showDragAndDropText: boolean = true;


  constructor(private postService: PostService){

  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
            this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            this.fileEntry.file((file: File) => {
                // Here you can access the real file
                console.log(droppedFile.relativePath, file);
                this.fileUploaded = true;

                // Mettre à jour le texte du bouton avec le nom du fichier sélectionné
                this.uploadButtonText = file.name;

                // Cacher le texte "Drag and drop (or)" car un fichier est sélectionné
                this.showDragAndDropText = false;
            });
        } else {
            // It was a directory (empty directories are added, otherwise only files)
            const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            console.log(droppedFile.relativePath, fileEntry);
        }
    }
}


  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  uploadPost() {
    const texteDuPost = this.postText;
    if (this.fileEntry !== undefined) {
      console.log(this.fileEntry);

      this.fileEntry.file(file => this.postService.uploadPost(texteDuPost ,file).subscribe((data) => {
        console.log("post uploaded successfully");
        window.location.reload();;
      }))
    }
  }
}