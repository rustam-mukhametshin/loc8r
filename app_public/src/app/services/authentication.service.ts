import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UrlService } from './url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  name = 'loc8r-token';

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private urlService: UrlService
  ) {
  }

  /**
   * Get token from localstorage
   */
  public getToken(): string {
    return this.storageService.getItem(this.name);
  }

  /**
   * Save token to localstorage
   * @param token payload
   */
  public saveToken(token: string): void {
    this.storageService.setItem(this.name, token);
  }

  /**
   * Login
   *
   * @param user: User
   */
  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user)
      .pipe(
        tap((authResp: AuthResponse) => this.saveToken(authResp.token))
      );
  }

  /**
   * Register
   *
   * @param user: User
   */
  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user)
      .pipe(
        tap((authResp: AuthResponse) => this.saveToken(authResp.token))
      );
  }

  /**
   * Make auth api call
   *
   * @param urlPath
   * @param user
   * @private
   */
  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url = this.urlService.getAuthPath(urlPath);

    return this.httpClient
      .post<AuthResponse>(url, user)
      .pipe(
        shareReplay(),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  /**
   * Logout
   */
  public logout(): void {
    this.storageService.removeItem(this.name);
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    const token: string = this.getToken();

    if (token) {

      const paylod = JSON.parse(atob(token.split('.')[1]));
      return paylod.exp > (Date.now() / 1000);

    }

    return false;
  }

  /**
   * Get current user
   */
  public getCurrentUser(): User {

    if (this.isLoggedIn()) {

      const token: string = this.getToken();
      const {email, name} = JSON.parse(atob(token.split('.')[1]));

      return {email, name} as User;
    }
  }
}
