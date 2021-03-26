import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../../services/geolocation.service';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {

  constructor(
    private geolocationService: GeolocationService
  ) {
    this.geolocationService.setPosition();
  }

  ngOnInit(): void {
  }
}
