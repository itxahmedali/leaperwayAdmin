import { Component, OnInit } from '@angular/core';
import { companyDB } from '../../../../shared/data/tables/company';

@Component({
  selector: 'app-basic-data-table',
  templateUrl: './basic-data-table.component.html',
  styleUrls: ['./basic-data-table.component.scss']
})
export class BasicDataTableComponent implements OnInit {

  public company = [];
  
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor() {
    this.company = companyDB.data;
  }

  ngOnInit(): void {
  }

}
