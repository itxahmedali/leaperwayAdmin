import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SharedModule } from "../../../shared/shared.module";
import { JobSearchRoutingModule } from './job-search-routing.module';

import { JobApplyComponent } from './job-apply/job-apply.component';
import { JobCardComponent } from './job-card/job-card.component';
import { JobDescComponent } from './job-desc/job-desc.component';
import { JobFilterComponent } from './job-filter/job-filter.component';
import { JobListComponent } from './job-list/job-list.component';

@NgModule({
  declarations: [JobListComponent, JobApplyComponent, JobDescComponent, JobFilterComponent, JobCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    SharedModule,
    JobSearchRoutingModule
  ]
})
export class JobSearchModule { }
