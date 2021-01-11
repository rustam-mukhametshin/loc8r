import { Component, OnInit } from '@angular/core';
import { Location } from '../../../models/Location';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  public locations: Location[];

  constructor(private dataService: DataService) {
    this.dataService = dataService;
  }

  ngOnInit(): void {
    this.getLocations();
  }

  /**
   * Get location
   *
   * @private
   */
  private getLocations(): void {
    this.dataService
      .getLocation()
      .then(response => this.locations = response)
    ;
  }

}
