import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { adminDetail } from 'src/app/_services/admin-detail.services';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NoticeService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: 'admin.login.page.component.html',
  styleUrls: ['admin.login.page.component.css'],
})
export class adminLoginPageComponent {
  public loginForm!: FormGroup;
  error: any;
  constructor(
    private authSer: AuthenticationService,
    private notice: NoticeService,
    private formbuilder: FormBuilder,
    private router: Router,
    private toast: HotToastService,
    private adminDetail: adminDetail
  ) {}
  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      usermail: ['', [Validators.required, Validators.email]],
      userpassword: ['', Validators.required],
    });
  }
  get usermail() {
    return this.loginForm.get('usermail');
  }
  get userpassword() {
    return this.loginForm.get('userpassword');
  }

  Login() {
    if (!this.loginForm.valid) {
      this.notice.invalidLogin();
    } else {
      const { usermail, userpassword } = this.loginForm.value;

      this.adminDetail.getAdmin().then((res) => {
        // for (let doc of res.docs) {
        //   console.log(doc.data());
        // }
        const res1 = Object.values(res.docs);
        const admin = res1.find((a: any) => {
          return usermail === a.data().usermail;
        });
        if (admin) {
          console.log(admin.data()['usermail']);
          this.authSer
            .login(usermail, userpassword)
            .pipe(
              this.toast.observe({
                success: 'logIn successfully!',
                loading: 'Logging In....',
                error: 'There was an Error',
              })
            )
            .subscribe((res) => {
              this.router.navigate(['/admin-dashboard', res.user.uid]);
            });
        } else {
          this.toast.error('Only Admin are authenticate!!');
        }
      });
      // if (usermail !== 'vikrantkumar@gmail.com') {
      //   this.notice.invalidLogin();
      // } else {
      //   this.authSer
      //     .login(usermail, userpassword)
      //     .pipe(
      //       this.toast.observe({
      //         success: 'logIn successfully!',
      //         loading: 'Logging In....',
      //         error: 'There was an Error',
      //       })
      //     )
      //     .subscribe((res) => {
      //       this.router.navigate(['/admin-dashboard', res.user.uid]);
      //     });
      // }
    }
  }
}
