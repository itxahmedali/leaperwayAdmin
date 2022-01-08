import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  public images = [{
    img: 'assets/images/ecommerce/01.jpg'
  },
  {
    img: 'assets/images/ecommerce/02.jpg'
  },
  {
    img: 'assets/images/ecommerce/03.jpg'
  },
  {
    img: 'assets/images/ecommerce/04.jpg'
  },
  {
    img: 'assets/images/ecommerce/05.jpg'
  },
  {
    img: 'assets/images/ecommerce/06.jpg'
  }];
  

  public ProductDetailsMainSliderConfig: any = {
    items: 1,
    nav: false,
    dots:false,
    autoplay: false,
    slideSpeed: 300,
    loop: true
  };

  public ProductDetailsThumbConfig: any = {
    items: 3,
    loop: true,
    margin: 10,
    dots:false
  };
  
}
