import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public cards=[
    {
      name:"Elena Gilbert",
      type:"assets/1x/mastercard.png",
      number:"************2174",
      DateExpedition:"01/20",
      DateExpiry:"01/26",
      cc:"098",
      
    },
    {
      name:"Elena Gilbert",
      type:"assets/1x/visa.png",
      number:"************2174",
      DateExpedition:"01/20",
      DateExpiry:"01/26",
      cc:"098",
      
    },
    {
      name:"Elena Gilbert",
      type:"assets/1x/paypal.png",
      number:"************2174",
      DateExpedition:"01/20",
      DateExpiry:"01/26",
      cc:"098",
      
    },
    {
      name:"Elena Gilbert",
      type:"assets/1x/unionpay.png",
      number:"************2174",
      DateExpedition:"01/20",
      DateExpiry:"01/26",
      cc:"098",
      
    },
  ]
  constructor() { }
  
  ngOnInit(): void {
  }
  
}
