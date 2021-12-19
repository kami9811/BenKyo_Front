import { Component, Input, OnInit } from '@angular/core';
import { Engine, Runner, Render, World, Constraint, MouseConstraint, Bodies} from 'matter-js'
import { PopoverController } from '@ionic/angular';
import { PopoverHintComponent } from '../popover-hint/popover-hint.component';

@Component({
  selector: 'app-fruit-basket',
  templateUrl: './fruit-basket.component.html',
  styleUrls: ['./fruit-basket.component.scss'],
})
export class FruitBasketComponent implements OnInit {
  @Input() count: any
  @Input() content: string

  engine: Engine
  render: Render

  width: any = 300
  height: any = 120

  cookies: any = [
    "../../../assets/img/cookie1_circle.png",
    "../../../assets/img/cookie2_heart.png",
    "../../../assets/img/cookie3_chocochip.png",
    "../../../assets/img/cookie4_star.png",
    "../../../assets/img/cookie5_check.png",
    "../../../assets/img/cookie6_flower.png",
  ]

  constructor(
    private popoverController: PopoverController,
  ) { }

  ngOnInit() {
    //Matter.js モジュール 初期設定
    // let Engine = Matter.Engine //物理シュミレーションおよびレンダリングを管理するコントローラーとなるメソッド
    //   World = Matter.World, //物理演算領域の作成・操作するメソッドを含む
    //   Body = Matter.Body, //剛体のモデルを作成・操作するメソッドを含む
    //   Bodies = Matter.Bodies, //一般的な剛体モデルを作成するメソッドを含む
    //   Constraint = Matter.Constraint, //制約を作成・操作するメソッドを含む
    //   Composites = Matter.Composites,
    //   Common = Matter.Common,
    //   Vertices = Matter.Vertices, //頂点のセットを作成・操作するメソッドを含む
    //   MouseConstraint = Matter.MouseConstraint; //マウスの制約を作成するためのメソッドが含む

    // Matter.jsのEngineを作成
    var container = document.getElementById('canvas-container');

    this.engine = Engine.create()
    this.render = Render.create({
        element: container,
        engine: this.engine,
        options: {
            width: this.width,
            height: this.height,
            wireframes: false,
            background: 'url(../../../assets/img/low-poly-grid-haikei.png)',
        },
    })

    //床を作る
    // World.add(engine.world, [Bodies.rectangle(320, 460, 480, 20, {
    World.add(this.engine.world, [Bodies.rectangle(this.width/2, this.height-(20/2), this.width, 20, {
      isStatic: true, //固定する
      render: {
        fillStyle: '#977559', // 塗りつぶす色: CSSの記述法で指定
        strokeStyle: 'rgba(0, 0, 0, 0)', // 線の色: CSSの記述法で指定
        lineWidth: 0
      }
    })]);
    World.add(this.engine.world, [Bodies.rectangle((20/2), this.height/2, 20, this.height, {
      isStatic: true, //固定する
      render: {
        fillStyle: '#977559', // 塗りつぶす色: CSSの記述法で指定
        strokeStyle: 'rgba(0, 0, 0, 0)', // 線の色: CSSの記述法で指定
        lineWidth: 0
      }
    })]);
    World.add(this.engine.world, [Bodies.rectangle(this.width-(20/2), this.height/2, 20, this.height, {
      isStatic: true, //固定する
      render: {
        fillStyle: '#977559', // 塗りつぶす色: CSSの記述法で指定
        strokeStyle: 'rgba(0, 0, 0, 0)', // 線の色: CSSの記述法で指定
        lineWidth: 0
      }
    })]);

    //物体を追加する
    this.addObject(1)

    // 物理シュミレーションを実行
    Engine.run(this.engine)
    Render.run(this.render)

  }

  addObject = (fall_num) => {
    //物体を追加する
    for (var i = 0; i < fall_num; i++) {
      var rndx = parseInt(String((Math.random() - 0.5) * 10));
      var rndy = parseInt(String((Math.random()) * 10));
      var x = (this.width/2) + (rndx * (this.width/6));
      var y = 0 - rndy;
      var kind = parseInt(String(Math.random()*this.cookies.length))
      // var rnd2 = parseInt(String(Math.random() * 320));
      // var x2 = rnd2;
      // var y2 = 0 - rnd2 * 2;
      
      World.add(this.engine.world, [
        Bodies.circle(x, y, 15, { //ボールを追加
          density: 1, // 密度: 単位面積あたりの質量
          frictionAir: 0.1, // 空気抵抗(空気摩擦)
          restitution: 0.01, // 弾力性
          friction: 1, // 本体の摩擦
          render: { //ボールのレンダリングの設定
            sprite: { //スプライトの設定
              texture: this.cookies[kind],
              xScale: 0.15,
              yScale: 0.15
            }
          },
          timeScale: 1.5 //時間の倍率を設定(1で1倍速)
        }),
        // Bodies.rectangle(x2 , y2, 160, 32, { //長方形を追加する
        //   render: {
        //     sprite: { //スプライトの設定
        //       texture: '../../../assets/img/icon.png', //スプライトに使うテクスチャ画像を指定
        //       xScale: 10,
        //       yScale: 10
        //     }
        //   }
        // })
      ]);
      
    }
  }

  popExplaination = async (e: any) => {
    const popover = await this.popoverController.create({
      component: PopoverHintComponent,
      event: e,
      componentProps: {
        "hint": `クッキー${this.count}個分<br>【${this.content}】<br>を勉強中！`
      }
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
