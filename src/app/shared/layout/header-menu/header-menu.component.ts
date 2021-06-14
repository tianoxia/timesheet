import {OnInit, OnDestroy, Component,
        ViewEncapsulation, ViewChild, ViewContainerRef} from '@angular/core';
import { Router} from '@angular/router';

import { AuthenticationService, UserTokenValidationService, DataService } from 'app/_services';
import { StripParamFromUrlPipe } from 'app/shared/pipes/strip-param-from-url.pipe';
import { LoginResponse } from 'app/_models';

@Component({
  selector: 'app-header',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderMenuComponent implements OnInit, OnDestroy {
  contractorName: string;
  public flag: boolean;
  @ViewChild('accountsContainer', {
    static: true, read: ViewContainerRef
  }) accountsViewContainerRef: ViewContainerRef;

  constructor(public authService: AuthenticationService,
              public dataService: DataService,
              public validateService: UserTokenValidationService,
              private router: Router,
              private stripParamPipe: StripParamFromUrlPipe) { }

  ngOnInit() { }

  currentIsLoginPage() {
    return (this.stripParamPipe.transform(this.router.url) === '/login');
  }
  currentIsApprovalPage() {
    return (this.stripParamPipe.transform(this.router.url) === '/process-expense'
      || this.stripParamPipe.transform(this.router.url) === '/process-timesheet');
  }
  currentIsHomePage() {
    return (this.stripParamPipe.transform(this.router.url) === '/');
  }
  public isLoggedIn() {
    let loggedInUser: LoginResponse = null;
    if (this.authService.currentUserValue) {
      loggedInUser = this.authService.currentUserValue;
      if (loggedInUser && loggedInUser.accessToken && this.validateService.isUserTokenValid(loggedInUser.accessToken)) {
        this.contractorName = loggedInUser.contractorName;
      } else {
        this.authService.logout();
      }
    }
    return loggedInUser === null ? false : true;
  }
  public logout() {
      this.authService.logout();
      this.router.navigate(['home']);
      if (this.accountsViewContainerRef) {
        this.accountsViewContainerRef.remove();
      }
  }
  ngOnDestroy() {
    if (this.accountsViewContainerRef) {
      this.accountsViewContainerRef.remove();
    }
  }
}
