import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private urls: string[] = [];

  constructor(
    private router: Router
  ) {
    this.router.events
      .pipe(filter(
        routerEvent => routerEvent instanceof NavigationEnd
      ))
      .subscribe((routerEvent: NavigationEnd) => {
        const url = routerEvent.urlAfterRedirects;
        console.log(url);
        this.urls = [...this.urls, url];
      });
  }
}