import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormChangeService {

  changed: boolean;

  formChanged(): void {
    this.changed = true;
  }

}
