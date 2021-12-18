import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-enter',
  templateUrl: './modal-enter.page.html',
  styleUrls: ['./modal-enter.page.scss'],
})
export class ModalEnterPage implements OnInit {
  @Input() host_user_id: string

  content: string = ""

  constructor(
    public modalController: ModalController,
    private gs: GlobalService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  processEnter = () => {
    // 参加者の開始処理
    const body = {
      "user_id": localStorage.uid,
      "room_id": localStorage.room_flag,
      "content": this.content
    }
    this.gs.http(environment.url + "history", body).subscribe(
      res => this.dismiss()
    )
  }

  dismiss = () => {
    localStorage.room_flag = undefined
    this.modalController.dismiss()
    this.router.navigate(['/home'])
  }

}
