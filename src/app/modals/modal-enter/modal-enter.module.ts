import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEnterPageRoutingModule } from './modal-enter-routing.module';

import { ModalEnterPage } from './modal-enter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEnterPageRoutingModule
  ],
  declarations: [ModalEnterPage]
})
export class ModalEnterPageModule {}
