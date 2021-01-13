import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../models/Location';
import { Review } from '../../models/Review';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {

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
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
  }

  private formIsValid(): boolean {
    return !!(this.newReview.author && this.newReview.rating && this.newReview.reviewText);
  }

  onReviewSubmit(): void {

    this.formError = '';

    if (this.formIsValid()) {
      this.dataService
        .addReviewByLocationId(this.location._id, this.newReview)
        .then(review => {
          console.log(review);
        })
      ;
    } else {
      this.formError = 'All fields required, please try again';
    }
  }
}
