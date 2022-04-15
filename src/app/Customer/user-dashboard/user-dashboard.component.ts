import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/Customer/dialog/dialog.component';
import { NoticeService } from 'src/app/_services/notification.service';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_model/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-user-dashboard',
  templateUrl: `user-dashboard.component.html`,
  styleUrls: ['user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  user$ = this.authService.currentUser$;
  profileUser: any;
  newProduct!: any;
  displayedColumns: string[] = [
    'date',
    'productName',
    'quantity',
    'process',
    'comment',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private notice: NoticeService,
    private product: ProductService,
    private ar: ActivatedRoute,
    private dialog: MatDialog,
    public authService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.notice.showNotification();

    this.userService.currentUserProfile$.subscribe((user) => {
      this.profileUser = user;
      this.getAllProduct(user);
    });
  }

  getAllProduct(user: any) {
    this.product
      .getProduct()
      .then((res) => {
        this.newProduct = [
          ...res.docs.map((prod) => {
            return { ...prod.data(), id: prod.id };
          }),
        ];
        let res1 = this.newProduct.filter((a: any) => {
          return a.pid === user?.uid;
        });
        this.dataSource = new MatTableDataSource(res1);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openDialog() {
    console.log(this.profileUser);
    this.dialog.open(DialogComponent, {
      width: '35%',
      data: this.profileUser,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
