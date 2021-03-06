import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GlobalService } from 'src/services/global.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { TimerComponent } from '../components/timer/timer.component';
import { TimerButtonComponent } from '../components/timer-button/timer-button.component';
import { FruitBasketComponent } from '../components/fruit-basket/fruit-basket.component';
import { ModalController } from '@ionic/angular';
import { ModalInformationPage } from '../modals/modal-information/modal-information.page';
import { ModalFacegamePage } from '../modals/modal-facegame/modal-facegame.page';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarGettingLikeComponent } from '../components/snackbar-getting-like/snackbar-getting-like.component';
import mojs from '@mojs/core';

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

  @ViewChild('own')
  ownFruit: FruitBasketComponent
  @ViewChildren('mates')
  mates: QueryList<FruitBasketComponent>

  room_id: string = ""

  interval: any
  syn_interval: any

  ownInformation: [Number, string] = [0, ""]

  room_status: string

  current_mate_list: any[] = []
  mate_list: any[] = []
  tmp_list: any[] = []

  constructor(
    public gs: GlobalService,
    public authentication: AuthenticationService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    private snackBar: MatSnackBar,
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
      // ???????????????
      const body = {
        count: localStorage.count,
        user_id: localStorage.uid
      }
      this.gs.httpPut(environment.url + "history/" + localStorage.room_flag, body).subscribe(
        res => {
          console.log(res)
          // ??????????????????
          this.checkRoomMate()
        }
      )
      this.gs.httpGet(environment.url + "tweet/" + localStorage.tweet_id).subscribe(
        res => {
          if (parseInt(localStorage.likeCount) < res["data"]["public_metrics"]["like_count"]) {
            this.snackBar.openFromComponent(SnackbarGettingLikeComponent, {
              duration: 2000,
            });
            this.getEffect();
            localStorage.likeCount = res["data"]["public_metrics"]["like_count"]
          }
        }
      )
    }, 5000)
  }
  ionViewDidLeave = () => {
    clearInterval(this.syn_interval)
  }

  getEffect = () => {
    const burst = new mojs.Burst({
      radius:   { 0: 100 },
      count:    50,
      children: {
        shape:      'polygon',
        points:     5,
        // fill:       { 'cyan' : 'yellow' },
        rotate:      { 360: 0 },
        duration:   3000,
        delay:      'stagger( rand(0, 200) )'
      }
    });
    burst.replay();
  }

  checkRoomMate = () => {
    this.gs.httpGet(environment.url + "room/" + this.room_id).subscribe(
      res => {
        console.log(res)
        // ??????????????????????????????(closed)????????????
        if ((res["status"] == 'closed') && (localStorage.room_flag !== undefined)) this.closeHistory()

        // ?????????????????????????????????
        for (let i = 0; i < res["open"].length; i++) {
          if (res["open"][i]["user_id"] == localStorage.uid) {
            // console.log(res["open"][i])
            this.ownInformation = [res["open"][i]["count"], res["open"][i]["content"]]
            this.current_mate_list = res["open"].filter(item => (item["user_id"] != localStorage.uid))
            break
          }
        }
        // current_mate_list??????????????????????????????
        // current???old??????????????????????????????
        this.tmp_list = this.current_mate_list
        for (let i = 0; i < this.mate_list.length; i++) this.tmp_list = this.tmp_list.filter(item => (item["user_id"] != this.mate_list[i]["user_id"]))
        this.mate_list = this.mate_list.concat(this.tmp_list)

        // current_mate_list?????????????????????????????????
        // old???current??????????????????????????????
        // this.tmp_list = this.mate_list
        // for (let i = 0; i < this.current_mate_list.length; i++) this.tmp_list = this.tmp_list.filter(item => (item["user_id"] != this.mate_list[i]["user_id"]))
        // this.mate_list = this.mate_list.concat(this.tmp_list)

        console.log(this.mates.toArray())
        this.mates.toArray().forEach(mate => {
          console.log(mate)
          console.log(mate["content"])
          // mate.addObject(1)
        })

        // mate_list????????????current_mate_list??????????????????
        // ??????count?????????????????????
        this.mate_list.forEach((mate, index) => {
          this.current_mate_list.forEach((c_mate) => {
            if(mate["user_id"] == c_mate["user_id"]) {
              let diff = c_mate["count"] - mate["count"]
              console.log(diff)
              this.mates.toArray()[index].addObject(diff)
            }
          })
        })
      }
    )
  }

  checkRoom = () => {
    this.gs.httpGet(environment.url + "room/" + this.room_id).subscribe(
      res => {
        // ?????????????????????
        for (let i = 0; i < res["open"].length; i++) {
          if (res["open"][i]["user_id"] == localStorage.uid) {
            this.ownInformation = [res["open"][i]["count"], res["open"][i]["content"]]
            this.ownFruit.addObject(res["open"][i]["count"])
            break
          }
        }
        // ?????????????????????????????????
        console.log(res)
        if (res["open"].length > 0) localStorage.host_user_id = res["open"][0]["user_id"]
        if (res["status"] == "open") this.authentication.checkTweetEnter(this.room_id, res["open"])
        else this.alertClosed()
      }
    )
  }

  alertClosed = async() => {
    const alert = await this.alertController.create({
      message: '????????????????????????????????????????????????????',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            localStorage.removeItem("room_flag")
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
      this.ownFruit.addObject(1)
      let c: any = parseInt(localStorage.count)
      localStorage.count = c + 1
    }, 10000)
  }
  onStop(event) {
    this.timer.stopTimer()
    clearInterval(this.interval)
  }

  closeStudy = () => {
    if (localStorage.host_user_id == localStorage.uid) this.closeRoom()
    else this.closeHistory()
  }

  closeRoom = () => {
    localStorage.removeItem("room_flag")
    const body = {
      "user_id": localStorage.uid,
      "count": localStorage.count
    }
    this.gs.http(environment.url + "room/" + this.room_id + "/close", body).subscribe(
      res => this.router.navigate(['/home'])
    )
  }

  closeHistory = () => {
    localStorage.removeItem("room_flag")
    const body = {
      "user_id": localStorage.uid,
      "count": localStorage.count
    }
    this.gs.http(environment.url + "history/" + this.room_id + "/close", body).subscribe(
      res => this.router.navigate(['/home'])
    )
  }

  getInformation = async() => {
    const modal = await this.modalController.create({
      component: ModalInformationPage,
      componentProps: {
        "own_count": this.ownInformation[0],
        "mate_list": this.mate_list,
      }
    });
    await modal.present();
  }

  startFacegame = async() => {
    const modal = await this.modalController.create({
      component: ModalFacegamePage,
      componentProps: {}
    });
    await modal.present();
  }

  navigateFacegame = () => {
    this.router.navigate(['/facegame'])
  }
}
