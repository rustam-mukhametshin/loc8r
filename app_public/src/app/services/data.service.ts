import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../models/Location';
import { Review } from '../models/Review';
import { environment } from '../../environments/environment';
import { User } from '../classes/user';
import { AuthResponse } from '../classes/authresponse';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  // Todo: remove
  private apiBaseUrl = environment.apiBaseUrl;

  /**
   * Get location
   */
  public getLocation(lat: number, lng: number): Promise<Location[]> {
    const maxDistance = 20;

    const url = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;

    // Todo: change to observable
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location[])
      .catch(this.handleError);
  }

  /**
   * Get single location
   *
   * @param locationId
   */
  public getLocationById(locationId: string): Promise<Location> {

    const url = `${this.apiBaseUrl}/locations/${locationId}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location)
      .catch(this.handleError);
  }

  /**
   * Create new review
   *
   * @param locationId
   * @param formData
   */
  public addReviewByLocationId(locationId: string, formData: Review): Promise<Review> {

    const url = `${this.apiBaseUrl}/locations/${locationId}/reviews`;

    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response as Review)
      .catch(this.handleError);
  }

  /**
   * Login
   *
   * @param user
   */
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  /**
   * Registration
   *
   * @param user
   */
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  /**
   * Make auth api call
   *
   * @param urlPath
   * @param user
   * @private
   */
  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url = `${this.apiBaseUrl}/${urlPath}`;

    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  /**
   * Handle error
   * @param error
   * @private
   */
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
