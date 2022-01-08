import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { FlatComponent } from './flat/flat.component';
import { EdgeComponent } from './edge/edge.component';
import { RaisedComponent } from './raised/raised.component';
import { ButtonGroupComponent } from './button-group/button-group.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        component: DefaultComponent
      },
      {
        path: 'flat',
        component: FlatComponent
      },
      {
        path: 'edge',
        component: EdgeComponent
      },
      {
        path: 'raised',
        component: RaisedComponent
      },
      {
        path: 'group',
        component: ButtonGroupComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule { }
