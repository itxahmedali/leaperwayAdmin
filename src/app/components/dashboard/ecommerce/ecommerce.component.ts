import { Component, OnInit } from '@angular/core';
import * as chartData from '../../../shared/data/dashboard/ecommerce'
@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnInit {

  public todayTotalSale = chartData.todayTotalSale;
  public totalVisit = chartData.totalVisit;
  public profit = chartData.profit;
  public riskFactor = chartData.riskFactor;

  public lat_m1: number =  20.593683;
  public lng_m1: number = 78.962883;
  public zoom_m1: number = 4;
  
  constructor() { }

  ngOnInit(): void {
  }

}
