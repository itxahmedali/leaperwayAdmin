import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatherIconComponent } from './feather-icon/feather-icon.component';
import { FlagIconComponent } from './flag-icon/flag-icon.component';
import { FontAwesomeIconComponent } from './font-awesome-icon/font-awesome-icon.component';
import { IcoIconComponent } from './ico-icon/ico-icon.component';
import { ThemifyIconComponent } from './themify-icon/themify-icon.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'flag',
        component: FlagIconComponent
      },
      {
        path: 'fontawesome',
        component: FontAwesomeIconComponent
      },
      {
        path: 'ico',
        component: IcoIconComponent
      },
      {
        path: 'themify',
        component: ThemifyIconComponent
      },
      {
        path: 'feather',
        component: FeatherIconComponent
      },
      {
        path: 'weather',
        component: WeatherIconComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule { }
