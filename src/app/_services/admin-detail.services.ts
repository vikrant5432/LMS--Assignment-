import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class adminDetail {
  constructor(private firestore: Firestore) {}

  getAdmin() {
    const dbGetData = collection(this.firestore, 'adminDetails');
    return getDocs(dbGetData);
  }
}
