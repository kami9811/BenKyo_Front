import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFacegamePage } from './modal-facegame.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFacegamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFacegamePageRoutingModule {}
