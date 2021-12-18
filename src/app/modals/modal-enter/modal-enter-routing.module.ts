import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEnterPage } from './modal-enter.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEnterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEnterPageRoutingModule {}
