import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() {
  }

  /**
   * Get user geolocation
   *
   * @param cbSuccess success
   * @param cbError error
   * @param cbNoGeo not supported
   */
  public getPosition(cbSuccess, cbError, cbNoGeo): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      cbNoGeo();
    }
  }
}
