import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NoticeService } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';
import { signup } from '../../_model/users.model';
@Component({
  selector: 'app-signup-page',
  templateUrl: 'signup.page.component.html',
  styleUrls: ['signup.page.component.css'],
})
export class signupPageComponent {
  public signForm!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private user: UserService,
    private router: Router,
    private notice: NoticeService,
    private AuthService: AuthenticationService,
    private toast: HotToastService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //form control
    this.signForm = this.formbuilder.group({
      uid: [''],
      username: ['', Validators.required],
      usermail: ['', Validators.required],
      usermobile: ['', Validators.required],
      userpassword: ['', Validators.required],
    });
  }

  get username() {
    return this.signForm.get('username');
  }
  get usermail() {
    return this.signForm.get('usermail');
  }
  get usermobile() {
    return this.signForm.get('usermobile');
  }
  get userpassword() {
    return this.signForm.get('userpassword');
  }
  signUp() {
    if (!this.signForm.valid) {
      this.notice.invalidLogin();
    } else {
      const { username, usermail, usermobile, userpassword } =
        this.signForm.value;
      this.AuthService.signUp(usermail, userpassword)
        .pipe(
          switchMap(({ user: { uid } }) =>
            this.user.addUser({
              uid,
              usermail,
              username,
              usermobile,
              userpassword,
            })
          ),
          this.toast.observe({
            success: 'Congrat! You are sign Up!',
            loading: 'Signing In ....',
            error: ({ message }) => `${message}`,
          })
        )
        .subscribe(() => {
          this.router.navigate(['/user-dashboard', 12323]);
        });
    }
  }
  // signUp() {
  //   this.userSignUp.getSignUp().subscribe((res) => {
  //     const res1 = Object.values(res);
  //     console.log(res1);
  //     const user = res1.find((a: any) => {
  //       return a.usermail === this.signForm.value.usermail;
  //     });
  //     if (user) {
  //       alert('user already exist!');
  //     } else {
  //       this.userSignUp.postSignUp(this.signForm.value).subscribe(
  //         (res) => {
  //           alert('success signUp');
  //           this.signForm.reset();
  //           this.router.navigate(['/login']);
  //         },
  //         (error) => {
  //           alert('something goes wrong');
  //         }
  //       );
  //     }
  //     console.log(typeof res);
  //     console.log(res);
  //   });
  // }
}
