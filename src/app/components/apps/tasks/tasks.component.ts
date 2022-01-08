import { Component, OnInit, ViewChild } from '@angular/core';
import { AddTaskComponent } from "./modal/add-task/add-task.component";
import { CreateTagComponent } from "./modal/create-tag/create-tag.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @ViewChild("addTask") AddTask: AddTaskComponent;
  @ViewChild("createTag") CreateTag: CreateTagComponent;

  constructor() { }

  ngOnInit() {
  }

}
