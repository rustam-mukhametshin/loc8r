import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../models/user';
import { LocationService } from './location.service';
import { AuthResponse } from '../models/authresponse';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  name = 'loc8r-token';

  constructor(
    private storageService: StorageService,
    private locationService: LocationService
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
    return this.locationService
      .login(user)
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
    return this.locationService
      .register(user)
      .pipe(
        tap((authResp: AuthResponse) => this.saveToken(authResp.token))
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
