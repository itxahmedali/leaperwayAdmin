import { Component, OnInit } from '@angular/core';
import * as chartData from '../../../shared/data/widget/chart'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public sale = chartData.sale;
  public projects = chartData.projects;
  public products = chartData.products;
  public marketingExpenses = chartData.marketingExpenses;
  public TotalEarning = chartData.TotalEarning;
  public browserUse = chartData.browserUse;
  public liveProducts = chartData.liveProducts;
  public turnOver = chartData.turnOver;
  public monthlySales = chartData.monthlySales;
  public uses = chartData.uses;
  public skillStatus = chartData.skillStatus;
  public progress1 = chartData.optionsProgress1;
  public progress2 = chartData.optionsProgress2;
  public progress3 = chartData.optionsProgress3;
  public progress4 = chartData.optionsProgress4;
  public progress5 = chartData.optionsProgress5;
  public finance = chartData.finance;
  public orderStatus = chartData.orderStatus;
  
  constructor() { }

  ngOnInit(): void {
  }

}
