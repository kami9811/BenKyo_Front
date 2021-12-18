import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
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
        console.log(user["multiFactor"]["user"]["providerData"][0]["displayName"])
        console.log(user["multiFactor"]["user"]["providerData"][0]["uid"])
        console.log("loged in")
        if (page != "home") this.router.navigate(["home"])
      } else {
        // not signed in.
        console.log("not loged in")
        if (page == "home") this.router.navigate(["/login"])
      }
    }))
  }

  public getUser = () => {
    return this.afAuth.currentUser
  }
}