import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/services/global.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-recommend',
  templateUrl: './modal-recommend.page.html',
  styleUrls: ['./modal-recommend.page.scss'],
})
export class ModalRecommendPage implements OnInit {

  content_1: string = ""
  content_2: string = ""
  content_3: string = ""
  exist_flag: boolean = false

  constructor(
    private gs: GlobalService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.gs.httpGet(`${environment.url}recommend/${localStorage.uid}`).subscribe(
      res => {
        console.log(res)
        if (res.length > 0) {
          this.content_1 = res[0]["content"]
          this.content_2 = res[1]["content"]
          this.content_3 = res[2]["content"]
          this.exist_flag = true
        }
      }
    )
  }

  dismiss = () => this.modalController.dismiss()

}
