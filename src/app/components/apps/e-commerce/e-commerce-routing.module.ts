import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CheckOutComponent } from './checkout/checkout.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        component: ProductComponent,
      },
      {
        path: "product-details/:id",
        component: ProductDetailsComponent
      },
      {
        path: "cart",
        component: CartComponent
      },
      {
        path: "wish-list",
        component: WishListComponent
      },
      {
        path: "checkout",
        component: CheckOutComponent
      },
      {
        path: "invoice",
        component: InvoiceComponent
      },
      {
        path: 'payment/detail',
        component: PaymentDetailsComponent
      },
      {
        path: 'order',
        component: OrderHistoryComponent
      },
      {
        path: 'product/list',
        component: ProductListComponent
      },
      {
        path: 'pricing',
        component: PricingComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
