import { Component, Input } from '@angular/core';
import { Location } from '../../models/Location';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent {

  @Input() location: Location;

  public googleAPIKey = 'Put your Google Maps API Key here';

  public formVisible = false;

  constructor(
    private authenticationService: AuthenticationService
  ) {
  }

  /**
   * Wrapper to check if user is logged in
   */
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  changeFormVisibility(val: boolean): void {
    this.formVisible = val;
  }
}
