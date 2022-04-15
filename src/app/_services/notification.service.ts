import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NoticeService {
  constructor(private snackBar: MatSnackBar) {}
  showNotification() {
    this.snackBar.open('Laundry will stop taking cloth after 12 PM', 'close', {
      duration: 5000,
      horizontalPosition: 'center',
    });
  }
  cleanStart() {
    this.snackBar.open('Cleaning has start', 'close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  cleanComplete() {
    this.snackBar.open('Cleaning is Done', 'close', {
      duration: 5000,
      horizontalPosition: 'center',
    });
  }
  DryStart() {
    this.snackBar.open('Dry has start', 'close', {
      duration: 5000,
      horizontalPosition: 'center',
    });
  }
  DryComplete() {
    this.snackBar.open('Dry is Done', 'close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
  invalidLogin() {
    this.snackBar.open('Invalid Form', 'close', {
      duration: 5000,
      horizontalPosition: 'center',
    });
  }
  productSaved() {
    this.snackBar.open('Product Added!!', 'close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  dontclosewindow() {
    this.snackBar.open("Process started Don't Close this Window!!", 'close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
