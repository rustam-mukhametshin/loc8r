import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor() {
  }

  /**
   * Url for locations
   */
  public getLocations(lng: number, lat: number, maxDistance: number = 20) {
    return `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
  }

  /**
   * Url for location
   */
  public getLocation(id: string) {
    return `${this.apiBaseUrl}/locations/${id}`;
  }

  /**
   * Url for location reviews
   */
  public getLocationReviews(id: string) {
    return `${this.apiBaseUrl}/locations/${id}/reviews`;
  }

  /**
   * Url for auth
   */
  public getAuthPath(path: string) {
    return `${this.apiBaseUrl}/${path}`;
  }
}
