import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { SharedModule } from '../../../shared/shared.module';

import { AddPostComponent } from './add-post/add-post.component';
import { BlogRoutingModule } from './blog-routing.module';
import { DetailsComponent } from './details/details.component';
import { SingleComponent } from './single/single.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*',
  createImageThumbnails: true
};


@NgModule({
  declarations: [DetailsComponent, SingleComponent, AddPostComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NgxDropzoneModule,
    DropzoneModule,
    CKEditorModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    { provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class BlogModule { }
