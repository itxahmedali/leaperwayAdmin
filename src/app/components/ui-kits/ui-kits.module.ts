import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiKitstsRoutingModule } from "./ui-kits-routing.module";

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



@NgModule({
  declarations: [TypographyComponent, AvatarsComponent, HelperClassesComponent, GridComponent, TagNPillsComponent, SpinnersComponent, ShadowComponent, ListComponent, RibbionsComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    UiKitstsRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class UiKitsModule { }
