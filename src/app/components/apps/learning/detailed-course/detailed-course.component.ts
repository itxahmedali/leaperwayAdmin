import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-course',
  templateUrl: './detailed-course.component.html',
  styleUrls: ['./detailed-course.component.scss']
})
export class DetailedCourseComponent implements OnInit {

  public isFindCourse: boolean = false;
  public isCategories: boolean = false;
  public isUpcomingCourses: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
