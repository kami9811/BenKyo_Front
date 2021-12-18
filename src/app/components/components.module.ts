import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';

// Components
import { TwitterLoginButtonComponent } from './twitter-login-button/twitter-login-button.component';
import { TwitterLogoutButtonComponent } from './twitter-logout-button/twitter-logout-button.component';
import { TimerComponent } from './timer/timer.component';
import { TimerButtonComponent } from './timer-button/timer-button.component';
import { FruitBasketComponent } from './fruit-basket/fruit-basket.component';
import { PopoverHintComponent } from './popover-hint/popover-hint.component';

@NgModule({
  declarations: [
    TwitterLoginButtonComponent,
    TwitterLogoutButtonComponent,
    TimerComponent,
    TimerButtonComponent,
    FruitBasketComponent,
    PopoverHintComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
  ],
  exports: [
    TwitterLoginButtonComponent,
    TwitterLogoutButtonComponent,
    TimerComponent,
    TimerButtonComponent,
    FruitBasketComponent,
    PopoverHintComponent,
  ],
})
export class ComponentsModule { }
