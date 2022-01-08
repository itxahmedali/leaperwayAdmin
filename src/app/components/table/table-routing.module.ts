import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './bootstrap-tables/basic/basic.component';
import { SizingComponent } from './bootstrap-tables/sizing/sizing.component';
import { BorderComponent } from './bootstrap-tables/border/border.component';
import { StylingComponent } from './bootstrap-tables/styling/styling.component';
import { TableComponentsComponent } from './bootstrap-tables/table-components/table-components.component';
import { FullscreenComponent } from './data-tables/fullscreen/fullscreen.component';
import { PagingComponent } from './data-tables/paging/paging.component';
import { SelectionComponent } from './data-tables/selection/selection.component';
import { ColumnFilterComponent } from './data-tables/column-filter/column-filter.component';
import { BasicDataTableComponent } from './data-tables/basic-data-table/basic-data-table.component'
import { SortComponent } from './data-tables/sort/sort.component';
import { InlineEditComponent } from './data-tables/inline-edit/inline-edit.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "bootstrap-tables",
        children: [
          {
            path: 'basic',
            component: BasicComponent
          },
          {
            path: 'sizing',
            component: SizingComponent
          },
          {
            path: 'border',
            component: BorderComponent
          },
          {
            path: 'styling',
            component: StylingComponent
          },
          {
            path: 'table-components',
            component: TableComponentsComponent
          },
        ]
      },
      {
        path: "datatables",
        children: [
          {
            path: 'basic',
            component: BasicDataTableComponent
          },
          {
            path: 'fullscreen',
            component: FullscreenComponent
          },
          {
            path: 'paging',
            component: PagingComponent
          },
          {
            path: 'selection',
            component: SelectionComponent
          },
          {
            path: 'column-filter',
            component: ColumnFilterComponent
          },
          {
            path: 'sort',
            component: SortComponent
          },
          {
            path: 'inline-edit',
            component: InlineEditComponent
          },
        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
