import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor(private db: AngularFirestore,
    private authService: AngularFireAuth,
    private router: Router
  ) { }

  register(user: User) {
    this
      .authService
      .auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(newUser => {
        user.id = newUser.user.uid;
        this.currentUser = user;
        this
          .db
          .collection('users')
          .doc(user.id)
          .set({...user})
          .then(() => {
            this.router.navigate(['/']);
          });
      });
  }

  login(username: string, passoword: string) {
    this
      .authService
      .auth
      .signInWithEmailAndPassword(username, passoword)
      .then((userLogged) => {
        this
          .db
          .collection<User>('users', ref => ref.where('id', '==', userLogged.user.uid))
          .valueChanges()
          .subscribe(user => {
            console.log(user);
            debugger;
            this.currentUser = user[0];
            this.router.navigate(['/']);
          });
      });
  }

  logout() {
    this
      .authService
      .auth
      .signOut()
      .then(() => {
        this.currentUser = null;
        this.router.navigate(['/']);
      });
  }
}
