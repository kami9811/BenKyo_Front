import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacegamePageRoutingModule } from './facegame-routing.module';

import { FacegamePage } from './facegame.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacegamePageRoutingModule
  ],
  declarations: [FacegamePage]
})
export class FacegamePageModule {}
