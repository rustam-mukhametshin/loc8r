import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/Location';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  locationId: string;
  location: Location;

  constructor(
  ) {
  }

  public pageContent = {
    header: {
      title: '',
      strapline: ''
    },
    sidebar: ''
  };

  ngOnInit(): void {
  }
}
