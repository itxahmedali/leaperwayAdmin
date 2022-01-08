import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamDetailsComponent } from './team-details/team-details.component';
// import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:"",
        component:TeamDetailsComponent
      },
      {
        path:"userProfile",
        component:UserProfileComponent
      },
      // {
      //   path:"profile",
      //   component:ProfileComponent
      // },
      // {
      //   path:"edit-profile",
      //   component:EditProfileComponent
      // }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
