import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ngx-ckeditor';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    AngularEditorModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
