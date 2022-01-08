import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountToModule } from 'angular-count-to';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from "../../../shared/shared.module";

import { SupportTicketRoutingModule } from './support-ticket-routing.module';
import { SupportTicketComponent } from './support-ticket.component';

@NgModule({
  declarations: [SupportTicketComponent],
  imports: [
    CommonModule,
    SupportTicketRoutingModule,
    CountToModule,
    FormsModule,
    NgxDatatableModule,
    SharedModule
  ]
})
export class SupportTicketModule { }
