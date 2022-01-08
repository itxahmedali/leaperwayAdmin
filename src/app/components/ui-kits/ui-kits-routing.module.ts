import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypographyComponent } from './typography/typography.component';
import { AvatarsComponent } from './avatars/avatars.component';
import { HelperClassesComponent } from './helper-classes/helper-classes.component';
import { GridComponent } from './grid/grid.component';
import { TagNPillsComponent } from './tag-n-pills/tag-n-pills.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { ShadowComponent } from './shadow/shadow.component';
import { ListComponent } from './list/list.component';
import { RibbionsComponent } from './ribbions/ribbions.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'typography',
        component: TypographyComponent
      },
      {
        path: 'avatars',
        component: AvatarsComponent
      },
      {
        path: 'helper-classes',
        component: HelperClassesComponent
      },
      {
        path: 'grid',
        component: GridComponent
      },
      {
        path: 'tag-n-pills',
        component: TagNPillsComponent
      },
      {
        path: 'spinner',
        component: SpinnersComponent
      },
      {
        path: 'shadow',
        component: ShadowComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'ribbons',
        component: RibbionsComponent
      },
      {
        path: 'breadcrumb',
        component: BreadcrumbComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiKitstsRoutingModule { }
