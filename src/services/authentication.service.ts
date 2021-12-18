import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalEnterPage } from 'src/app/modals/modal-enter/modal-enter.page';
import { async } from '@angular/core/testing';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private modalController: ModalController,
    private gs: GlobalService,
  ) {}

  // Sign in with Twitter
  public TwitterAuth = () => {
    this.afAuth.signInWithRedirect(new firebase.auth.TwitterAuthProvider())
    // return this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
  }
  public AuthResult = () => {
    return this.afAuth.getRedirectResult()
  }

  public AuthLogout = () => {
    this.afAuth.signOut()
    // this.router.navigate(['/login'])
  }

  public checkAuth = (page) => {
    this.afAuth.onAuthStateChanged(((user) => {
      if (user) {
        // Already signed in.
        localStorage.user = user
        console.log(user)
        console.log(user["multiFactor"]["user"]["providerData"][0])
        localStorage.displayName = user["multiFactor"]["user"]["providerData"][0]["displayName"]
        localStorage.uid = user["multiFactor"]["user"]["providerData"][0]["uid"]
        console.log("loged in")
        if (page != "home") this.router.navigate(["/home"])
      } else {
        // not signed in.
        console.log("not loged in")
        if (page == "home") this.router.navigate(["/login"])
      }
    }))
  }

  public checkTweetEnter = (room_id, open) => {
    localStorage.room_flag = room_id
    
    this.afAuth.onAuthStateChanged(((user) => {
      if (user) {
        // Already signed in.
        localStorage.user = user
        localStorage.displayName = user["multiFactor"]["user"]["providerData"][0]["displayName"]
        localStorage.uid = user["multiFactor"]["user"]["providerData"][0]["uid"]
        let exist_flag: Boolean = false
        for (let i = 0; i < open.length; i++) {
          if (open[i]["user_id"] == localStorage.uid) {
            exist_flag = true
            localStorage.content = open[i]["content"]
            localStorage.count = open[i]["count"]
            break
          }
        }
        // Modal呼び出し
        if (!exist_flag) {
          this.presentModal(localStorage.host_user_id)
        }
        else {
          console.log("入室済みの人のRoomの開始処理")
        }
      } else {
        // not signed in.
        this.router.navigate(["/login"])
      }
    }))
  }

  public getUser = () => {
    return this.afAuth.currentUser
  }

  presentModal = async(host_user_id) => {
    const modal = await this.modalController.create({
      component: ModalEnterPage,
      componentProps: {
        'host_user_id': host_user_id
      }
    });
    return await modal.present();
  }
}