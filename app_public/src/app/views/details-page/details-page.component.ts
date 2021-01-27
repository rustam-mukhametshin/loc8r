import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../services/data.service';
import { switchMap } from 'rxjs/operators';
import { Location } from '../../models/Location';
import { PageInfo } from '../../interfaces/PageInfo';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit, PageInfo {

  locationId: string;
  location: Location;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
  }

  public pageContent = {
    header: {
      title: '',
      strapline: ''
    },
    sidebar: ''
  };

  ngOnInit(): void {
    const text = ` is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.\n\nIf you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.`;

    this.route
      .paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('locationId');
          return this.dataService.getLocationById(id);
        })
      )
      .subscribe((newLocation: Location) => {
          this.pageContent.header.title = newLocation.name;
          this.pageContent.sidebar = `${newLocation.name} ${text}`;
          this.location = newLocation;
        }
      );
  }
}
