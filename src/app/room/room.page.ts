import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/services/global.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  room_id: string = ""

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

  checkRoom = () => {
    this.gs.httpGet(environment.url + "room/" + this.room_id).subscribe(
      res => {
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

}
