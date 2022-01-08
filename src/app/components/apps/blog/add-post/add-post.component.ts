import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  public category = [{ id:1, name: "Life Style" },{ id:2, name: "Travel" }];
  public selectedCategory: string[] = [];
  public ClassicEditor = ClassicEditor;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    addRemoveLinks:true,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  
  constructor() { }

  ngOnInit(): void {
  }

  public onUploadInit(args: any): void {

  }

  public onUploadError(args: any): void {

  }

  public onUploadSuccess(args: any): void {

  }

}
