import { Component, OnInit } from '@angular/core';
import { productDB } from '../../../../shared/data/tables/product-list';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  public products = productDB.orderHistory;
  
  constructor() {
  }
  
  ngOnInit() { }

}
