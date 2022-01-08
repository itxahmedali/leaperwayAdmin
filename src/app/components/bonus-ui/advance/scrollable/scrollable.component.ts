import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.scss']
})
export class ScrollableComponent implements OnInit {
  public disabled: boolean = false;
  
  constructor() { }

  ngOnInit() { }

  public config: PerfectScrollbarConfigInterface = {
    suppressScrollX: false,
    useBothWheelAxes : false
  };

  public configBothSideScroll : PerfectScrollbarConfigInterface ={
    suppressScrollX: false,
  }
  
  public configX: PerfectScrollbarConfigInterface = {
    suppressScrollX: false,
    suppressScrollY:true,
  };

  public configY: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    suppressScrollY:false,
  };
}
