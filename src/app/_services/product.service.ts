import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { signup } from '../_model/users.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  getProduct() {
    const dbGetData = collection(this.firestore, 'products');
    return getDocs(dbGetData);
  }
  addProduct(product: any) {
    const dbGetData = collection(this.firestore, 'products');
    return addDoc(dbGetData, product);  
  }

  FindProduct(userid: any) {
    const ref = doc(this.firestore, 'products', userid);
    return from(getDoc(ref));
  }

  updateProduct(uid: any, user: signup) {
    const ref = doc(this.firestore, 'products', uid);
    return updateDoc(ref, { ...user });
  }
}
