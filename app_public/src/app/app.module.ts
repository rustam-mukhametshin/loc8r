import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeListComponent } from './views/home-list/home-list.component';
import { DistancePipe } from './pipes/distance.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FrameworkComponent } from './views/framework/framework.component';
import { AboutComponent } from './views/about/about.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { PageHeaderComponent } from './views/page-header/page-header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { HtmlLineBreaksPipe } from './pipes/html-line-breaks.pipe';
import { RatingStarsComponent } from './views/rating-stars/rating-stars.component';
import { DetailsPageComponent } from './views/details-page/details-page.component';
import { LocationDetailsComponent } from './views/location-details/location-details.component';
import { MostRecentFirstPipe } from './pipes/most-recent-first.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';

const layout = [
  FrameworkComponent,
  PageHeaderComponent,
];

const pipes = [
  DistancePipe,
  HtmlLineBreaksPipe,
  MostRecentFirstPipe,
];

const components = [
  HomeListComponent,
  AboutComponent,
  HomepageComponent,
  SidebarComponent,
  RatingStarsComponent,
  DetailsPageComponent,
  LocationDetailsComponent,
];

@NgModule({
  declarations: [
    ...pipes,
    ...components,
    ...layout,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [
    FrameworkComponent,
  ]
})
export class AppModule {
}
