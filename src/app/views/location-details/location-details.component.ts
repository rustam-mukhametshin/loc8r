import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location } from '../../models/Location';
import { Review } from '../../models/Review';
import { LocationService } from '../../services/location.service';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingService } from '../../services/loading.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent {

  @Input() location: Location;

  public googleAPIKey = 'Put your Google Maps API Key here';

  public newReview: Review = {
    author: '',
    rating: 5,
    reviewText: ''
  };

  public formVisible = false;
  public formError: string;

  constructor(
    private dataService: LocationService,
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
