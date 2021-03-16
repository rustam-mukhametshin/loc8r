import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../models/Location';
import { Review } from '../models/Review';
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
        shareReplay(),
        catchError(err => {
          return throwError(err);
        })
      );
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
