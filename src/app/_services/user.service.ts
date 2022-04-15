import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { updateDoc } from '@firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { signup } from '../_model/users.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  get currentUserProfile$(): Observable<signup | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        //return observable with document data
        return docData(ref) as Observable<signup>;
      })
    );
  }

  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService
  ) {}
  addUser(user: signup): Observable<void> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }
  updateUser(user: signup): Observable<void> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
