import { Component } from '@angular/core';
import {
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class homeComponent {
  user$ = this.userService.currentUserProfile$;
  router!: any;
  constructor(
    private authService: AuthenticationService,
    private _router: Router,
    private userService: UserService
  ) {
    _router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.router = event.url;
      }
    });
  }
  logOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
