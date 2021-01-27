import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../models/Location';
import { Review } from '../models/Review';
import { environment } from '../../environments/environment';
import { User } from '../classes/user';
import { AuthResponse } from '../classes/authresponse';
import { BROWSER_STORAGE } from '../classes/storage';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {
  }

  // Todo: remove
  private apiBaseUrl = environment.apiBaseUrl;

  /**
   * Get locations
   */
  public getLocations(lat: number, lng: number): Observable<Location[]> {
    const maxDistance = 20;

    const url = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;

    return this.http.get<Location[]>(url);
  }

  /**
   * Get single location
   *
   * @param locationId
   */
  public getLocationById(locationId: string): Observable<Location> {

    const url = `${this.apiBaseUrl}/locations/${locationId}`;

    return this.http
      .get<Location>(url)
      .pipe(
        shareReplay()
      );
  }

  /**
   * Create new review
   *
   * @param locationId
   * @param formData
   */
  public addReviewByLocationId(locationId: string, formData: Review): Promise<Review> {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('loc8r-token')}`
      })
    };

    const url = `${this.apiBaseUrl}/locations/${locationId}/reviews`;

    return this.http
      .post(url, formData, httpOptions)
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
