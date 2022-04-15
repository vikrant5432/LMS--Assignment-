import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { interval, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from 'src/app/_services/product.service';
import { NoticeService } from 'src/app/_services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: 'admin-dashboard.component.html',
  styleUrls: ['admin-dashboard.component.css'],
})
export class AdminDashBoardComponent {
  ready!: any;
  user$ = this.authService.currentUser$;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  profileUser: any;
  getProduct: any;

  displayedColumns: string[] = [
    'pid',
    'date',
    'username',
    'productName',
    'quantity',
    'process',
    'comment',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private notice: NoticeService,
    private product: ProductService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.currentUserProfile$.subscribe((user) => {
      this.profileUser = user;
      this.getAllProduct(user);
    });
  }
  getAllProduct(user: any) {
    this.product
      .getProduct()
      .then((res) => {
        this.getProduct = [
          ...res.docs.map((prod) => {
            return { ...prod.data(), id: prod.id };
          }),
        ];

        this.dataSource = new MatTableDataSource(this.getProduct);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeStatus(row: any) {
    this.notice.cleanStart();
    this.notice.dontclosewindow();

    console.log(row);
    row.cbutton = true;
    this.product.updateProduct(row.id, row).then((res) => {
      console.log(res);
    });

    setTimeout(() => {
      row.status = 'cleaning complete,Drying will start';
      this.getProduct.status = 'cleaning complete,Drying will start';
      this.product.updateProduct(row.id, row).then(() => {
        this.notice.cleanComplete();
      });
    }, 3600000);
  }

  changeDryStatus(row: any) {
    this.notice.DryStart();
    this.notice.dontclosewindow();

    console.log(row);
    row.dbutton = true;
    this.product.updateProduct(row.id, row).then((res) => {
      console.log(res);
    });
    setTimeout(() => {
      row.status = 'Your Cloth is Ready to pick';
      this.getProduct.status = 'Your Cloth is Ready to pick';
      row.check = true;
      this.product.updateProduct(row.id, row).then(() => {
        this.notice.DryComplete();
      });
    }, 3600000);
  }

  logOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['admin-login']);
    });
  }
}
