import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new BehaviorSubject<string[]>([]);

  errors$: Observable<string[]> = this.subject.asObservable()
    .pipe(
      filter(msg => msg && msg.length > 0)
    )
  ;

  constructor() {
  }

  /**
   * Show errors
   */
  showErrors(...errors: string[]) {
    this.subject.next(errors);
  }
}
