import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Logout
   */
  public doLogout(): void {
    this.authenticationService.logout();
  }

  /**
   * Check if user is logged in
   */
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  /**
   * Get username
   */
  public getUsername(): string {
    const user: User = this.authenticationService.getCurrentUser();

    return user ? user.name : 'Guest';
  }
}
