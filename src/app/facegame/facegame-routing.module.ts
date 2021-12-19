import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacegamePage } from './facegame.page';

const routes: Routes = [
  {
    path: '',
    component: FacegamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacegamePageRoutingModule {}
