import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobApplyComponent } from './job-apply/job-apply.component';
import { JobDescComponent } from './job-desc/job-desc.component';
import { JobCardComponent } from './job-card/job-card.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cards',
        component: JobCardComponent
      },
      {
        path: 'list',
        component: JobListComponent
      },
      {
        path: 'details/:id',
        component: JobDescComponent
      },
      {
        path: 'apply/:id',
        component: JobApplyComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSearchRoutingModule { }
