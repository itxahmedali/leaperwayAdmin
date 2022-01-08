import { Component, OnInit } from '@angular/core';
import { companyDB } from '../../../../shared/data/tables/company';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {

  public company = [];

  constructor() {
    this.company = companyDB.data;
  }

  ngOnInit(): void {
  }

}
