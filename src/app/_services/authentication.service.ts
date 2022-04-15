import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}
  login(usermail: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, usermail, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  signUp(usermail: string, userpassword: string): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, usermail, userpassword)
    );
  }
}
