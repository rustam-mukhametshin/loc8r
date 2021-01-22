import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public credentials = {
    email: '',
    password: ''
  };

  public pageContent = {
    header: {
      title: 'Sign in to Loc8r',
      strapline: ''
    },
    sidebar: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Submit to register
   */
  public onLoginSubmit(): void {

    if (!this.credentials.email || !this.credentials.password) {

    } else {
      this.doLogin();
    }
  }

  /**
   * Registration
   *
   * @private
   */
  private doLogin(): void {
    this.authenticationService
      .login(this.credentials)
      .then(() => this.router.navigateByUrl('/'))
      .catch(err => console.log(err));
  }
}
