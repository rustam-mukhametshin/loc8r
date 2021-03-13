import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../models/Location';
import { Review } from '../models/Review';
import { User } from '../classes/user';
import { AuthResponse } from '../classes/authresponse';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { UrlService } from './url.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService,
    private storageService: StorageService
  ) {
  }

  /**
   * Get locations
   */
  public getLocations(lat: number, lng: number): Observable<Location[]> {

    const url = this.urlService.getLocations(lng, lat);

    return this.http.get<Location[]>(url);
  }

  /**
   * Get single location
   *
   * @param locationId
   */
  public getLocationById(locationId: string): Observable<Location> {

    const url = this.urlService.getLocation(locationId);

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
  public addReviewByLocationId(locationId: string, formData: Review): Observable<Review> {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storageService.getItem('loc8r-token')}`
      })
    };

    const url = this.urlService.getLocationReviews(locationId);

    return this.http.post<Review>(url, formData, httpOptions)
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
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
    const url = this.urlService.getAuthPath(urlPath);

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
