import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

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
   * Check if user is logged in
   */
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
