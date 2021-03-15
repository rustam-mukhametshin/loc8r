import { Component, OnInit } from '@angular/core';
import { PageInfo } from '../../models/PageInfo';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, PageInfo {

  constructor() {
  }

  /**
   * Page content
   */
  public pageContent = {
    header: {
      title: 'Loc8r',
      subtitle: 'Find places to work with wifi near you!'
    },
    sidebar: 'Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with ' +
      'coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.'
  };

  ngOnInit(): void {
  }
}
