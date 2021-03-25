import { Inject, Injectable } from '@angular/core';
import { NAVIGATOR } from '@ng-web-apis/common';
import { MessageService } from './message.service';
import { BehaviorSubject, Observable } from 'rxjs';

export interface L {
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private subject = new BehaviorSubject<L>(null);
  private location: Observable<L> = this.subject.asObservable();

  constructor(
    @Inject(NAVIGATOR) private navigator: Navigator,
    private messageService: MessageService
  ) {
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

  /**
   * Set geo position
   */
  setPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.cbSuccess.bind(this), this.cbError.bind(this));
    } else {
      this.cbNoGeo();
    }
  }

  /**
   * Success
   */
  private cbSuccess(position: GeolocationPosition): void {
    const obj: L = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    this.subject.next(obj);
  }

  /**
   * Error
   */
  private cbError(err: any): void {
    this.messageService.showErrors(err.message);
  }

  /**
   * No geo
   */
  private cbNoGeo() {
    this.messageService.showErrors('Geolocation not supported by this browser');
  }
}
