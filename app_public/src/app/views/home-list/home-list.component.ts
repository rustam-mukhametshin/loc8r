import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/Location';
import { LocationService } from '../../services/location.service';
import { GeolocationService } from '../../services/geolocation.service';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  public locations$: Observable<Location[]>;

  public message: string;

  constructor(
    private dataService: LocationService,
    private geolocationService: GeolocationService,
    private loadingService: LoadingService,
    private messageService: MessageService
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

    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;

    const locations$ = this.dataService.getLocations(lat, lng);

    this.locations$ = locations$
      .pipe(
        tap(locations => locations.length > 0 ? '' : this.messageService.showErrors('No locations found')
        ),
        finalize(() => {
          this.loadingService.loadingOff();
        })
      );
  }

  /**
   * Any errors
   *
   * @param error
   * @private
   */
  private showError(error: any): void {
    this.messageService.showErrors(error.message);
  }


  /**
   * Not supported geolocation
   *
   * @private
   */
  private noGeo(): void {
    this.messageService.showErrors('Geolocation not supported by this browser');
  }

  /**
   * Get locations base on geo position
   *
   * @private
   */
  private getPosition(): void {

    this.loadingService.loadingOn();

    this.geolocationService.getPosition(
      this.getLocations.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    );
  }
}
