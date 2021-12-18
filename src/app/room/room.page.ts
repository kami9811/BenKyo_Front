import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/services/global.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { TimerComponent } from '../components/timer/timer.component';
import { TimerButtonComponent } from '../components/timer-button/timer-button.component';
import { FruitBasketComponent } from '../components/fruit-basket/fruit-basket.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  @ViewChild(TimerComponent, {static: false})
  timer: TimerComponent
  @ViewChild(TimerButtonComponent, {static: false})
  timerButton: TimerButtonComponent
  @ViewChild(FruitBasketComponent, {static: false})
  fruitBasket: FruitBasketComponent

  room_id: string = ""

  interval: any
  syn_interval: any

  ownInformation: [Number, string] = [0, ""]

  constructor(
    public gs: GlobalService,
    public authentication: AuthenticationService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.room_id = params["room_id"]
        this.checkRoom()
      }
    )
  }
  ionViewDidEnter = () => {
    this.syn_interval = setInterval(() => {
      // 自分の同期
      const body = {
        count: localStorage.count,
        user_id: localStorage.uid
      }
      this.gs.httpPut(environment.url + "history/" + localStorage.room_flag, body).subscribe(
        res => {
          console.log(res)
          // 他の人の同期
          this.checkRoomMate()
        }
      )

    }, 20000)
  }
  ionViewDidLeave = () => {
    clearInterval(this.syn_interval)
  }

  checkRoomMate = () => {
    this.gs.httpGet(environment.url + "room/" + this.room_id).subscribe(
      res => {
        console.log(res)
        // console.log(res["open"].length)
        // ルームメイトの内容確認
        for (let i = 0; i < res["open"].length; i++) {
          if (res["open"][i]["user_id"] == localStorage.uid) {
            console.log(res["open"][i])
            this.ownInformation = [res["open"][i]["count"], res["open"][i]["content"]]
            break
          }
        }
      }
    )
  }

  checkRoom = () => {
    this.gs.httpGet(environment.url + "room/" + this.room_id).subscribe(
      res => {
        // 自分の内容確認
        for (let i = 0; i < res["open"].length; i++) {
          if (res["open"][i]["user_id"] == localStorage.uid) {
            this.ownInformation = [res["open"][i]["count"], res["open"][i]["content"]]
            this.fruitBasket.addObject(res["open"][i]["count"])
            break
          }
        }
        // 部屋確認とログイン確認
        console.log(res)
        localStorage.host_user_id = res["open"][0]["user_id"]
        if (res["status"] == "open") this.authentication.checkTweetEnter(this.room_id, res["open"])
        else this.alertClosed()
      }
    )
  }

  alertClosed = async() => {
    const alert = await this.alertController.create({
      message: 'この部屋は閉じられてしまいました😢',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/home'])
          }
        }
      ]
    });
    await alert.present();
  }

  onStart(event) {
    this.timer.startTimer()
    this.interval = setInterval(() => {
      this.fruitBasket.addObject(1)
      let c: any = parseInt(localStorage.count)
      localStorage.count = c + 1
    }, 10000)
  }
  onStop(event) {
    this.timer.stopTimer()
    clearInterval(this.interval)
  }

}
