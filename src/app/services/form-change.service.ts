import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormChangeService {

  private subject: Subject<boolean> = new Subject<boolean>();
  formChanged: Observable<boolean> = this.subject.asObservable();

  onFormChanged(): void {
    this.subject.next(true);
  }

}
