import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TweetService } from 'src/services/tweet.service';
import { GlobalService } from 'src/services/global.service';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-start',
  templateUrl: './modal-start.page.html',
  styleUrls: ['./modal-start.page.scss'],
})
export class ModalStartPage implements OnInit {

  content: string = ""
  tweet_id: string = ""

  waiting: any

  constructor(
    public modalController: ModalController,
    private tweet: TweetService,
    private gs: GlobalService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.content = localStorage.lastContent
    console.log()
  }

  postTweet() {
    this.loading()
  }

  loading = async () => {
    this.waiting = await this.loadingController.create({
      message: `展開中...⏳`,
      duration: 10000
    })
    await this.waiting.present().then(
      () => this.navigateRoom()
    )
  }

  navigateRoom = () => {
    localStorage.lastContent = this.content
    const body = {
      "user_id": localStorage.uid,
      "content": this.content,
      "tweet_id": this.tweet_id,
    }
    this.gs.http(environment.url + "room", body).subscribe(
      res => {
        this.tweet.postTweet(localStorage.displayName, this.content, res["room_id"], res["history_id"]).subscribe(
          response => {
            localStorage.tweet_id = response["data"]["id"];
            this.waiting.dismiss();
            this.dismiss();
            localStorage.likeCount = 0
            this.router.navigate(["/room", res["room_id"]]);
          },
          error => this.alertFailure(error)
        )
      },
      error => this.alertFailure(error)
    )
  }

  alertFailure = async (error) => {
    const alert = await this.alertController.create({
      message: `通信に失敗しました…<br>もう一度<br>やり直してください🥺<br>${error}`,
      buttons: [{ text: 'OK' }]
    });
    await alert.present();
  }

  dismiss = () => this.modalController.dismiss()
}
