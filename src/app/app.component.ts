import { Component } from '@angular/core';
import {
  Event as NavigationEvent,
  NavigationStart,
  Router,
} from '@angular/router';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <app-home
      *ngIf="
        router != '/admin-login' &&
        router != '/admin-dashboard/wIc4w88YXATuxolDQ8FCa97vxAV2'
      "
    ></app-home>

    <app-adminLayout *ngIf="adminRouter === '/admin-login'"></app-adminLayout>
    <app-adminLayout
      *ngIf="adminRouter === '/admin-dashboard/wIc4w88YXATuxolDQ8FCa97vxAV2'"
    ></app-adminLayout>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  user$ = this.userService.currentUserProfile$;
  router: any;
  adminRouter: any;
  constructor(private _router: Router, private userService: UserService) {
    _router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.router = event.url;
        this.adminRouter = event.url;
      }
    });
  }

  ngOnInit(): void {}
}
