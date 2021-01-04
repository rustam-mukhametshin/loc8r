import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/Location';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {

  constructor() {
  }

  locations: Location[] = [{
    _id: '5fd23c71c2ac5f0b3c7c7a31',
    name: 'Costy',
    distance: 14.0,
    address: 'High Street, Reading',
    rating: 3,
    facilities: ['hot drinks', 'food', 'power']
  }];

  ngOnInit(): void {
  }

}
