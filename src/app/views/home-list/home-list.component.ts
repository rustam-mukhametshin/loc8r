import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/Location';
import { LocationService } from '../../services/location.service';
import { GeolocationService } from '../../services/geolocation.service';
import { Observable } from 'rxjs';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
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
    private locationService: LocationService,
    private geolocationService: GeolocationService,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) {
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
    this.loadingService.loadingOn();

    this.locations$ = this.geolocationService.geolocation$
      .pipe(
        filter(d => d !== null),
        switchMap(nav => {
            const {lat, lng} = nav;
            return this.locationService.getLocations(lat, lng)
              .pipe(
                tap(locations => locations.length > 0 ? '' : this.messageService.showErrors('No locations found')
                ),
                finalize(() => {
                  this.loadingService.loadingOff();
                })
              );
          }
        )
      );
  }
}
