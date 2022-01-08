import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/shared.module";
import { TasksRoutingModule } from './tasks-routing.module';

import { TasksComponent } from './tasks.component';
import { AddTaskComponent } from './modal/add-task/add-task.component';
import { CreateTagComponent } from './modal/create-tag/create-tag.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule
  ],
  declarations: [TasksComponent, AddTaskComponent, CreateTagComponent]
})
export class TasksModule { }
