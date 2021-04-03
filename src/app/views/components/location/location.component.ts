import { Component, Input } from '@angular/core';
import { Location } from '../../../models/Location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
})
export class LocationComponent {

  @Input() location: Location;

}
