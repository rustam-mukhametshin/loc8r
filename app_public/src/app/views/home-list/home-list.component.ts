import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/Location';
import { DataService } from '../../services/data.service';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  public locations: Location[];

  public message: string;

  constructor(
    private dataService: DataService,
    private geolocationService: GeolocationService
  ) {
    this.dataService = dataService;
    this.geolocationService = geolocationService;
  }

  ngOnInit(): void {
    this.getPosition();
  }

  /**
   * Get location
   *
   * @private
   */
  private getLocations(position: Position): void {

    this.message = 'Searching for nearby places';

    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;

    this.dataService
      .getLocations(lat, lng)
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


  /**
   * Not supported geolocation
   *
   * @private
   */
  private noGeo(): void {
    this.message = 'Geolocation not supported by this browser';
  }

  /**
   * Get locations base on geo position
   *
   * @private
   */
  private getPosition(): void {
    this.message = 'Getting you location ...';

    this.geolocationService.getPosition(
      this.getLocations.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    );
  }
}
