import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NoticeService } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';
import { ProductService } from '../../_services/product.service';

@UntilDestroy()
@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.css'],
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup;
  userlist: any;
  warning: any = '';
  currentDate: any;
  constructor(
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<DialogComponent>,
    private ps: ProductService,
    private notice: NoticeService,
    private userService: UserService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { profileUser: any }
  ) {
    this.userlist = data;
    this.currentDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    // this.userService.currentUserProfile$
    //   .pipe(untilDestroyed(this))
    //   .subscribe((user) => {
    //     console.log(user);
    //   });

    this.productForm = this.fb.group({
      pid: [this.userlist.uid],
      username: [this.userlist.username],
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      process: ['', Validators.required],
      comment: ['', Validators.required],
      date: [this.currentDate],
      status: ['Processing'],
      cbutton: [false],
      dbutton: [false],
      check: [false],
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      this.ps
        .addProduct(this.productForm.value)
        .then((res) => {
          this.productForm.reset(),
            this.dialogRef.close(),
            this.notice.productSaved();
        })
        .catch((err) => {
          console.log((this.warning = 'fill all the detail!!'));
        });
    }
  }
}
