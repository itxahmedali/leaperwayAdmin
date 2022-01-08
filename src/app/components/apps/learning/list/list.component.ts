import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public isFindCourse: boolean = false;
  public isCategories: boolean = false;
  public isUpcomingCourses: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
