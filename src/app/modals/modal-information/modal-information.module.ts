import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInformationPageRoutingModule } from './modal-information-routing.module';

import { ModalInformationPage } from './modal-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInformationPageRoutingModule
  ],
  declarations: [ModalInformationPage]
})
export class ModalInformationPageModule {}
