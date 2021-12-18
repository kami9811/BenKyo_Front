import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';

// Components
import { TwitterLoginButtonComponent } from './twitter-login-button/twitter-login-button.component';
import { TwitterLogoutButtonComponent } from './twitter-logout-button/twitter-logout-button.component';

@NgModule({
  declarations: [
    TwitterLoginButtonComponent,
    TwitterLogoutButtonComponent,
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
  ],
})
export class ComponentsModule { }
