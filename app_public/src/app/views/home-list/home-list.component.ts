import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/Location';
import { DataService } from '../../services/data.service';
import { GeolocationService } from '../../services/geolocation.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  public locations$: Observable<Location[]>;

  public message: string;

  constructor(
    private dataService: DataService,
    private geolocationService: GeolocationService
  ) {
  }

  ngOnInit(): void {
    this.getPosition();
  }

  /**
   * Get location
   *
   * @private
   */
  private getLocations(position): void {

    this.message = 'Searching for nearby places';

    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;

    this.dataService
      .getLocations(lat, lng)
      .subscribe((foundLocations: Location[]) => {

        this.message = foundLocations.length > 0 ? '' : 'No locations found';

        this.locations = foundLocations;
      });
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
