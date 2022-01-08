import { Component, OnInit } from '@angular/core';
import * as accordion from '../../../shared/data/faq/accordion'
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  public accordion1 = accordion.accordion1;
  public accordion2 = accordion.accordion2;
  public accordion3 = accordion.accordion3;
  public accordion4 = accordion.accordion4;

  public term: string
  
  constructor() {
  }

  ngOnInit(): void {
  }

}
