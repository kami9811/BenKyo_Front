import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/services/tweet.service';
import { ModalController } from '@ionic/angular';
import { ModalStartPage } from '../modals/modal-start/modal-start.page';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { ModalRecommendPage } from '../modals/modal-recommend/modal-recommend.page';

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
    private authentication: AuthenticationService,
  ) {}

  ngOnInit() {
    this.superReload()
  }

  ionViewDidEnter() {
    console.log("Room Flag: " + localStorage.room_flag)
    if (localStorage.room_flag !== undefined) this.router.navigate(['/room', localStorage.room_flag])
  }

  openModal = async() => {
    const modal = await this.modalController.create({
      component: ModalStartPage,
      componentProps: {}
    });
    await modal.present();
  }

  openRecommendModal = async() => {
    const modal = await this.modalController.create({
      component: ModalRecommendPage,
      componentProps: {}
    });
    await modal.present();
  }

  superReload = () => {
    // スーパーリロード
    const date = new Date()
    const currentDate = {"month": date.getMonth(), "date": date.getDate(), "year": date.getFullYear()}
    const lastLoad = localStorage.lastLoad === undefined ? undefined : JSON.parse(localStorage.lastLoad)
    console.log("Last Load: " + lastLoad)

    if (localStorage.lastLoad === undefined) {
      localStorage.lastLoad = JSON.stringify(currentDate)
      console.log("Changed: " + localStorage.lastLoad)
    }
    else {
      const currentDateJson = JSON.stringify(Object.entries(currentDate).sort());
      const lastLoadJson = JSON.stringify(Object.entries(lastLoad).sort());

      if (currentDateJson !== lastLoadJson) {
        localStorage.lastLoad = JSON.stringify(currentDate)
        console.log("Changed: " + localStorage.lastLoad)
        window.location.href = window.location.href
      }
    }
  }

}
