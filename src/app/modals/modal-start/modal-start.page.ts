import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TweetService } from 'src/services/tweet.service';
import { GlobalService } from 'src/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-start',
  templateUrl: './modal-start.page.html',
  styleUrls: ['./modal-start.page.scss'],
})
export class ModalStartPage implements OnInit {

  content: string = ""

  constructor(
    public modalController: ModalController,
    private tweet: TweetService,
    private gs: GlobalService
  ) { }

  ngOnInit() {
    this.content = localStorage.lastContent
  }

  postTweet() {
    localStorage.lastContent = this.content
    const body = {
      "user_id": localStorage.uid,
      "content": this.content
    }
    this.gs.http(environment.url + "room", body).subscribe(
      res => {
        console.log(res)
        window.location.href=this.tweet.postTweet(localStorage.displayName, this.content, res["room_id"])
      }
    )
  }

  dismiss = () => {
    this.modalController.dismiss()
  }
}
