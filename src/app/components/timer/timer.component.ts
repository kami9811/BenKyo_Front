import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  

  timer_id: any
  timer_last: any
  timer_start: any
  timer_between: any
  timer: string = "00:00"

  m: number
  s: number

  timer_flag: Boolean = false

  constructor(
    private alertController: AlertController,
  ) { }

  ngOnInit() {}

  startTimer = () => {
    this.timer_flag = true
    this.timer_start = Date.now()
    this.timer_last = this.timer_start
    this.countUp()
  }
  countUp = () => {
    this.timer_id = setTimeout(() => {
        this.timer_between = Date.now() - this.timer_start
        if (this.m >= 99) {
          this.alertLimit()
          this.stopTimer()
        }
        else {
          this.updateTimer()
          this.countUp();
        }
    },200);
  }
  updateTimer = () => {
    this.m = Math.floor(this.timer_between / 60000);
    this.s = Math.floor(this.timer_between % 60000 / 1000);
    //let ms = this.timer_between % 1000;
    let minute = ('0' + this.m).slice(-2);
    let second = ('0' + this.s).slice(-2);
    //let millisecond = ('0' + ms).slice(-3);

    this.timer = minute + ':' + second
  }
  stopTimer = () => {
    this.timer_flag = false
    clearTimeout(this.timer_id)
  }
  alertLimit = async () => {
    const alert = await this.alertController.create({
      message: 'そろそろ休憩を挟みましょう☺️',
      buttons: [ { text: 'OK' } ]
    });
    await alert.present();
  }

}
