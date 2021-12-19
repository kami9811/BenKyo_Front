import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-information',
  templateUrl: './modal-information.page.html',
  styleUrls: ['./modal-information.page.scss'],
})
export class ModalInformationPage implements OnInit {
  @Input() own_count: any
  @Input() mate_list: any[] = []

  all_food: any = 0

  flag: Boolean = false

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.mate_list.forEach(mate => {
      this.all_food = this.all_food + mate["count"]
    })
    this.all_food = this.all_food + this.own_count

    if (this.mate_list.length > 0) this.flag = true
  }

  dismiss = () => {
    this.modalController.dismiss()
  }

}
