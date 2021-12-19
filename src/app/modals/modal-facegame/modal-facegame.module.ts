import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFacegamePageRoutingModule } from './modal-facegame-routing.module';

import { ModalFacegamePage } from './modal-facegame.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFacegamePageRoutingModule
  ],
  declarations: [ModalFacegamePage]
})
export class ModalFacegamePageModule {}
