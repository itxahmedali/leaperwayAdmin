import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileManagerComponent } from './file-manager.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FileManagerComponent
      },
      {
        path:'restaurantProfile',
        component:RestaurantProfileComponent
      },
      {
        path:'restaurantInfo',
        component:ProfileViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule { }
