import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NoticeService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.component.html',
  styleUrls: ['login.page.component.css'],
})
export class loginPageComponent implements OnInit {
  public loginForm!: FormGroup;
  error: any;
  constructor(
    private authSer: AuthenticationService,
    private notice: NoticeService,
    private formbuilder: FormBuilder,
    private router: Router,
    private toast: HotToastService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
          this.router.navigate(['/user-dashboard', res.user.uid]);
          console.log(res.user.email);
        });
    }
  }
}
