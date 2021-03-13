import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../classes/storage';
import { User } from '../classes/user';
import { LocationService } from './location.service';
import { AuthResponse } from '../classes/authresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  name = 'loc8r-token';

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private locationService: LocationService
  ) {
  }

  /**
   * Get token from localstorage
   */
  public getToken(): string {
    return this.storage.getItem(this.name);
  }

  /**
   * Save token to localstorage
   * @param token payload
   */
  public saveToken(token: string): void {
    this.storage.setItem(this.name, token);
  }

  /**
   * Login
   *
   * @param user: User
   */
  public login(user: User): Promise<any> {
    return this.locationService
      .login(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  /**
   * Register
   *
   * @param user: User
   */
  public register(user: User): Promise<any> {
    return this.locationService
      .register(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  /**
   * Logout
   */
  public logout(): void {
    this.storage.removeItem(this.name);
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
