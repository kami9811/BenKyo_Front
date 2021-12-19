import { Component, OnInit } from '@angular/core';
import * as faceapi from 'face-api.js';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-facegame',
  templateUrl: './modal-facegame.page.html',
  styleUrls: ['./modal-facegame.page.scss'],
})
export class ModalFacegamePage implements OnInit {

  interval: NodeJS.Timeout
  video: HTMLVideoElement
  stream: MediaStream

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.startCamera()
  }

  startCamera = () => {
    this.video = document.querySelector("#camera")
    /** カメラ設定 */
    const constraints = {
      audio: false,
      video: {
        width: 300,
        height: 200,
        // facingMode: "user"   // フロントカメラを利用する
        // facingMode: { exact: "environment" }  // リアカメラを利用する場合
      }
    }

    // カメラを<video>と同期
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      this.video.srcObject = stream
      this.stream = stream
      this.video.onloadedmetadata = (e) => {
        this.video.play()
      };
    })
    .catch( (err) => console.log(err.name + ": " + err.message) );
  }

  setupFaceapi = async() => {
    // モデルの読み込み
    await faceapi.nets.tinyFaceDetector.load("assets/models/");
    await faceapi.nets.faceExpressionNet.load("assets/models/");
    this.interval = setInterval(async () => {
      // 顔の表情の分類
      const detectionsWithExpressions = await faceapi.detectAllFaces(this.video,new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()

      // 結果の出力
      console.log(detectionsWithExpressions);
      if (detectionsWithExpressions.length !== 0) {
        detectionsWithExpressions.forEach(
          face => {
            console.log(face["expressions"])
            // if (face["expressions"]["happy"] > 0.5) this.smile_times += 1
          }
        )
      }
    }, 1000)
  }

  dismiss = () => {
    this.modalController.dismiss()
  }
}
