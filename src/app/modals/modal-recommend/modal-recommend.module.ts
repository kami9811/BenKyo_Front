import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalRecommendPageRoutingModule } from './modal-recommend-routing.module';

import { ModalRecommendPage } from './modal-recommend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalRecommendPageRoutingModule
  ],
  declarations: [ModalRecommendPage]
})
export class ModalRecommendPageModule {}
