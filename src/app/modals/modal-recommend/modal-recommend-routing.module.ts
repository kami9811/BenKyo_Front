import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalRecommendPage } from './modal-recommend.page';

const routes: Routes = [
  {
    path: '',
    component: ModalRecommendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalRecommendPageRoutingModule {}
