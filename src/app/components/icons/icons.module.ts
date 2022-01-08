import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { IconsRoutingModule } from './icons-routing.module';

import { FeatherIconComponent } from './feather-icon/feather-icon.component';
import { FlagIconComponent } from './flag-icon/flag-icon.component';
import { FontAwesomeIconComponent } from './font-awesome-icon/font-awesome-icon.component';
import { IcoIconComponent } from './ico-icon/ico-icon.component';
import { ThemifyIconComponent } from './themify-icon/themify-icon.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';


@NgModule({
  declarations: [
    FlagIconComponent,
    FontAwesomeIconComponent,
    IcoIconComponent,
    ThemifyIconComponent,
    FeatherIconComponent,
    WeatherIconComponent
  ],
  imports: [
    CommonModule,
    IconsRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class IconsModule { }
