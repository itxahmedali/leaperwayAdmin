import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryDescComponent } from './gallery-desc/gallery-desc.component';
import { GalleryGridComponent } from './gallery-grid/gallery-grid.component';
import { HoverEffectComponent } from './hover-effect/hover-effect.component';
import { MesonryComponent } from './mesonry/mesonry.component';
const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'gallery-grid',
      component: GalleryGridComponent
    },
    {
      path: 'gallery-desc',
      component: GalleryDescComponent
    },
    {
      path: 'mesonry',
      component: MesonryComponent
    },
    {
      path: 'hover',
      component: HoverEffectComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
