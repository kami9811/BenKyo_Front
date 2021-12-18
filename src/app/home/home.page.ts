import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/services/tweet.service';
import { ModalController } from '@ionic/angular';
import { ModalStartPage } from '../modals/modal-start/modal-start.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private tweet: TweetService,
    public modalController: ModalController,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (localStorage.room_flag !== undefined) this.router.navigate(['/room', localStorage.room_flag])
  }

  openModal = async() => {
    const modal = await this.modalController.create({
      component: ModalStartPage,
      componentProps: {}
    });
    await modal.present();
  }

}
