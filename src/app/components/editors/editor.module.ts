import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ngx-ckeditor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from '../../shared/shared.module';
import { EditorRoutingModule } from './editor-routing.module';

import { EditorComponent } from './editor.component';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    AngularEditorModule,
    EditorRoutingModule,
    SharedModule
  ]
})
export class EditorModule { }
