import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../classes/storage';
import { User } from '../classes/user';
import { DataService } from './data.service';
import { AuthResponse } from '../classes/authresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  name = 'loc8r-token';

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private dataService: DataService
  ) {
  }

  /**
   * Get token from localstorage
   */
  public getToken(): string {
    return this.storage.getItem(this.name);
  }

  /**
   * Get token from localstorage
   * @param token payload
   */
  public saveToken(token: string): void {
    this.storage.setItem(this.name, token);
  }
}
