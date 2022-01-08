import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { single } from 'rxjs/operators';
import { SingleComponent } from './single/single.component';
import { AddPostComponent } from './add-post/add-post.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'details',
        component:DetailsComponent
      },
      {
        path:'single',
        component:SingleComponent
      },
      {
        path:'add-post',
        component:AddPostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
