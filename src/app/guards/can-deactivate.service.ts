import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

interface CComponent {
  canDeactivate(name: string): Observable<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateService implements CanDeactivate<CComponent> {

  constructor(
    private authenticationService: AuthenticationService,
  ) {
  }

  canDeactivate(
    component: CComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate ? component.canDeactivate(this.authenticationService.getCurrentUser().name) : true;
  }
}
