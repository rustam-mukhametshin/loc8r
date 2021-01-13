import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../models/Location';
import { Review } from '../../models/Review';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
