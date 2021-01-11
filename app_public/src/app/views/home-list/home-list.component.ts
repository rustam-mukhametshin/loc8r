import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/Location';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  public locations: Location[];

  public message: string;

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

    this.message = 'Searching for nearby places';

    this.dataService
      .getLocation()
      .then(foundLocation => {

        this.message = foundLocation.length > 0 ? '' : 'No locations found';

        this.locations = foundLocation;
      })
    ;
  }

  /**
   * Any errors
   *
   * @param error
   * @private
   */
  private showError(error: any): void {
    this.message = error.message;
  }
}
