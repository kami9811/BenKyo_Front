import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInformationPage } from './modal-information.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInformationPageRoutingModule {}
