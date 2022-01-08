import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { PaymentNotificationsComponent } from './payment-notifications/payment-notifications.component';
import { TotalRestaurantsComponent } from './total-restaurants/total-restaurants.component';
import { TotalUsersComponent } from './total-users/total-users.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DefaultComponent
      },
      // {
      //   path:'restaurantProfile',
      //   component:RestaurantProfileComponent
      // },
      // {
      //   path:'restaurantInfo',
      //   component:ProfileViewComponent
      // }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
