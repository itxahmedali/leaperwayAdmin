import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../../../shared/shared.module";
import { LearningRoutingModule } from './learning-routing.module';

import { ListComponent } from './list/list.component';
import { DetailedCourseComponent } from './detailed-course/detailed-course.component';

@NgModule({
  declarations: [ListComponent, DetailedCourseComponent],
  imports: [
    CommonModule,
    LearningRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class LearningModule { }
