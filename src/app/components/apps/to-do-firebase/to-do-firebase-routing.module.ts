import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoFirebaseComponent } from './to-do-firebase.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ToDoFirebaseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoFirebaseRoutingModule { }
