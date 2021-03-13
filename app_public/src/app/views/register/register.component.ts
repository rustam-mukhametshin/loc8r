import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HistoryService } from '../../services/history.service';
import { PageInfo } from '../../interfaces/PageInfo';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, PageInfo, OnDestroy {

  private rSub: Subscription;

  public formError = '';

  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  public pageContent = {
    header: {
      title: 'Create a new account',
      strapline: ''
    },
    sidebar: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  /**
   * Submit to register
   */
  onRegisterSubmit() {
    this.formError = '';
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doRegister();
    }
  }

  /**
   * Registration
   *
   * @private
   */
  private doRegister(): void {
    this.rSub = this.authenticationService
      .register(this.credentials)
      .pipe(
        catchError(err => {
          this.formError = err.error.message;
          console.error('While logging ...', err);
          return throwError(err);
        }),
      )
      .subscribe(() => {
        const lastUrl = this.historyService.getLastNonLoginUrl();
        this.router.navigateByUrl(lastUrl);
      })
    ;
  }
}
