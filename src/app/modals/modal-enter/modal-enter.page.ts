import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/services/global.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TweetService } from 'src/services/tweet.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-modal-enter',
  templateUrl: './modal-enter.page.html',
  styleUrls: ['./modal-enter.page.scss'],
})
export class ModalEnterPage implements OnInit {
  @Input() host_user_id: string

  content: string = ""
  tweet_id: string = ""

  waiting: any

  constructor(
    public modalController: ModalController,
    private gs: GlobalService,
    private router: Router,
    private alertController: AlertController,
    private tweet: TweetService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
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
      () => this.processEnter()
    )
  }

  processEnter = () => {
    // 参加者の開始処理
    localStorage.lastContent = this.content
    const body = {
      "user_id": localStorage.uid,
      "room_id": localStorage.room_flag,
      "content": this.content,
      "tweet_id": this.tweet_id,
    }
    // this.gs.http(environment.url + "history", body).subscribe(
    //   res => this.closeModal()
    // )
    this.gs.http(environment.url + "history", body).subscribe(
      res => {
        this.tweet.postTweet(localStorage.displayName, this.content, localStorage.room_flag, res["history_id"]).subscribe(
          response => {
            localStorage.tweet_id = response["data"]["id"];
            this.waiting.dismiss();
            this.closeModal();
            localStorage.likeCount = 0
            this.router.navigate(["/room", localStorage.room_flag]);
          },
          error => this.alertFailure(error)
        )
      }, error => this.alertFailure(error)
    )
  }

  closeModal = () => {
    this.modalController.dismiss()
  }

  dismiss = () => {
    localStorage.removeItem("room_flag")
    this.modalController.dismiss()
    this.router.navigate(['/home'])
  }

  alertFailure = async (error) => {
    const alert = await this.alertController.create({
      message: `通信に失敗しました…<br>もう一度<br>やり直してください🥺<br>${error}`,
      buttons: [{ text: 'OK' }]
    });
    await alert.present();
  }
}
