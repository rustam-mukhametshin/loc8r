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
export class LocationDetailsComponent implements OnInit, OnDestroy {

  @Input() location: Location;

  public googleAPIKey = 'Put your Google Maps API Key here';

  public newReview: Review = {
    author: '',
    rating: 5,
    reviewText: ''
  };

  rSub: Subscription;

  public formVisible = false;
  public formError: string;

  constructor(
    private dataService: LocationService,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  private formIsValid(): boolean {
    return !!(this.newReview.author && this.newReview.rating && this.newReview.reviewText);
  }

  /**
   * Reset form values
   *
   * @private
   */
  private resetAndHideReviewForm(): void {
    this.formVisible = false;
    this.newReview.author = '';
    this.newReview.rating = 5;
    this.newReview.reviewText = '';
  }


  /**
   * Create review
   */
  onReviewSubmit(): void {

    this.formError = '';
    this.newReview.author = this.getUsername();

    if (this.formIsValid()) {
      this.loadingService.loadingOn();

      this.rSub = this.dataService
        .addReviewByLocationId(this.location._id, this.newReview)
        .pipe(
          finalize(() => this.loadingService.loadingOff())
        )
        .subscribe((review: Review) => {

          const reviews = this.location.reviews.slice(0);
          reviews.unshift(review);
          this.location.reviews = reviews;

          this.resetAndHideReviewForm();
        })
      ;
    } else {
      this.formError = 'All fields required, please try again';
    }
  }

  /**
   * Wrapper to check if user is logged in
   */
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  /**
   * Get username
   */
  public getUsername(): string {
    const {name} = this.authenticationService.getCurrentUser();
    return name ?? 'Guest';
  }
}
