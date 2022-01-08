import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { BasicComponent } from './bootstrap-tables/basic/basic.component';
import { BorderComponent } from './bootstrap-tables/border/border.component';
import { SizingComponent } from './bootstrap-tables/sizing/sizing.component';
import { StylingComponent } from './bootstrap-tables/styling/styling.component';
import { TableComponentsComponent } from './bootstrap-tables/table-components/table-components.component';
import { TableRoutingModule } from './table-routing.module';
import { FullscreenComponent } from './data-tables/fullscreen/fullscreen.component';
import { PagingComponent } from './data-tables/paging/paging.component';
import { SelectionComponent } from './data-tables/selection/selection.component';
import { ColumnFilterComponent } from './data-tables/column-filter/column-filter.component';
import { BasicDataTableComponent } from './data-tables/basic-data-table/basic-data-table.component';
import { SortComponent } from './data-tables/sort/sort.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InlineEditComponent } from './data-tables/inline-edit/inline-edit.component';

@NgModule({
  declarations: [
    BasicComponent,
    SizingComponent,
    BorderComponent,
    StylingComponent,
    TableComponentsComponent,
    FullscreenComponent,
    PagingComponent,
    SelectionComponent,
    ColumnFilterComponent,
    BasicDataTableComponent,
    SortComponent,
    InlineEditComponent,

  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class TableModule { }
