import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialAppComponent } from './social-app.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SocialAppComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialAppRoutingModule { }
