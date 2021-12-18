import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalStartPageRoutingModule } from './modal-start-routing.module';

import { ModalStartPage } from './modal-start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalStartPageRoutingModule
  ],
  declarations: [ModalStartPage]
})
export class ModalStartPageModule {}
