import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { Angular2PhotoswipeModule } from 'angular2_photoswipe';
import { CrystalGalleryModule } from 'ngx-crystal-gallery';
import { NgxMasonryModule } from 'ngx-masonry';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';
import { SharedModule } from "../../../shared/shared.module";

import { GalleryDescComponent } from './gallery-desc/gallery-desc.component';
import { GalleryGridComponent } from './gallery-grid/gallery-grid.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { HoverEffectComponent } from './hover-effect/hover-effect.component';
import { MesonryComponent } from './mesonry/mesonry.component';

import 'hammerjs';
import 'mousetrap';


@NgModule({
  declarations: [GalleryGridComponent, GalleryDescComponent, MesonryComponent, HoverEffectComponent,],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    Angular2PhotoswipeModule,
    GalleryModule.forRoot(),
    MasonryGalleryModule,
    CrystalGalleryModule,
    NgxMasonryModule,
    SharedModule
  ]
})
export class GalleryDemoModule { }
