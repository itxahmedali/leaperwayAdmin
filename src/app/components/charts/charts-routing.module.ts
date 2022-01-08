import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleComponent } from './google/google.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { ChartistComponent } from './chartist/chartist.component';
import { NgxChartComponent } from './ngx-chart/ngx-chart.component';
import { KnobChartComponent } from './knob-chart/knob-chart.component';
import { ApexChartComponent } from './apex-chart/apex-chart.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'google',
        component: GoogleComponent
      },
      {
        path: 'chartjs',
        component: ChartjsComponent
      },
      {
        path: 'chartist',
        component: ChartistComponent
      },
      {
        path: 'ngx-chart',
        component: NgxChartComponent
      },
      {
        path: 'knob',
        component: KnobChartComponent
      },
      {
        path: 'apex',
        component: ApexChartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
