import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-adminLayout',
  templateUrl: 'adminLayout.component.html',
  styleUrls: ['adminLayout.component.css'],
})
export class AdminLayoutComponent {
  user$ = this.userService.currentUserProfile$;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {
    console.log(this.user$);
  }
  logOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/admin-login']);
    });
  }
}
