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

  game_flag: Boolean = false
  clear_flag: Boolean = false
  checked_value: Number
  score: any = 0
  face_index: number
  quiz: string = ""
  quiz_JP: string = ""

  face_set: string[] = [
    "angry",
    "disgusted",
    "fearful",
    "happy",
    "neutral",
    "sad",
    "surprised",
  ]
  face_set_JP: any = {
    "angry": "怒った顔して😠",
    "disgusted": "嫌そうな顔して…",
    "fearful": "怖がった顔して👻",
    "happy": "幸せそうな顔して😀",
    "neutral": "真面目な顔して👦",
    "sad": "悲しい顔して🥺",
    "surprised": "驚いた顔して😵",
  }

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
        height: 300,
        facingMode: "user"   // フロントカメラを利用する
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

    this.face_index = parseInt(String(Math.random()*this.face_set.length))
    this.quiz = this.face_set[this.face_index]
    this.quiz_JP = this.face_set_JP[this.quiz]

    this.interval = setInterval(async () => {
      if (this.clear_flag) {
        this.face_index = parseInt(String(Math.random()*this.face_set.length))
        this.quiz = this.face_set[this.face_index]
        this.quiz_JP = this.face_set_JP[this.quiz]
        this.clear_flag = false
      }

      // 顔の表情の分類
      const detectionsWithExpressions = await faceapi.detectAllFaces(this.video,new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()

      // 結果の出力
      console.log(detectionsWithExpressions);
      if (detectionsWithExpressions.length !== 0) {
        detectionsWithExpressions.forEach(
          face => {
            console.log(face["expressions"])
            this.checked_value = face["expressions"][this.quiz]
            if (this.checked_value > 0.4) {
              this.score += 1
              this.clear_flag = true
            }
            // if (face["expressions"]["happy"] > 0.5) this.smile_times += 1
          }
        )
      }
    }, 1000)
  }

  dismiss = () => {
    this.modalController.dismiss()
    this.stream.getTracks().forEach(track => track.stop())
    clearInterval(this.interval)
  }
}
