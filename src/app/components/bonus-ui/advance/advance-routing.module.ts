import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwlCarouselComponent } from './owl-carousel/owl-carousel.component';
import { ScrollableComponent } from './scrollable/scrollable.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { SweetAlert2Component } from './sweet-alert2/sweet-alert2.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { StickyComponent } from './sticky/sticky.component';
import { ImageCroperComponent } from './image-croper/image-croper.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'scrollable',
        component: ScrollableComponent
      },
      {
        path: 'dropzone',
        component: DropzoneComponent
      },
      {
        path: 'sweetAlert2',
        component: SweetAlert2Component
      },
      {
        path: 'owl-carousel',
        component: OwlCarouselComponent
      },
      {
        path: 'range-slider',
        component: RangeSliderComponent
      },
      {
        path: 'image-cropper',
        component: ImageCroperComponent
      },

      {
        path: 'sticky',
        component: StickyComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvanceRoutingModule { }
