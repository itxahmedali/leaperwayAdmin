import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { ChartComponent } from './chart/chart.component';
import { GeneralComponent } from './general/general.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [ChartComponent, GeneralComponent],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    NgbModule,
    CountToModule,
    CarouselModule,
    ChartistModule,
    ChartsModule,
    FormsModule,
    SharedModule,
    NgApexchartsModule
  ]
})
export class WidgetsModule { }
