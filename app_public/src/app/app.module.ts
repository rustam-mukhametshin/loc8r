import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeListComponent } from './views/home-list/home-list.component';
import { DistancePipe } from './pipes/distance.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FrameworkComponent } from './views/framework/framework.component';
import { AboutComponent } from './views/about/about.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { PageHeaderComponent } from './views/page-header/page-header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { HtmlLineBreaksPipe } from './pipes/html-line-breaks.pipe';
import { RatingStarsComponent } from './views/rating-stars/rating-stars.component';
import { DetailsPageComponent } from './views/details-page/details-page.component';

const layout = [
  FrameworkComponent,
  PageHeaderComponent,
];

const pipes = [
  DistancePipe,
  HtmlLineBreaksPipe,
];

const components = [
  HomeListComponent,
  AboutComponent,
  HomepageComponent,
  SidebarComponent,
  RatingStarsComponent,
  DetailsPageComponent,
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
    RouterModule.forRoot([
      {path: '', component: HomepageComponent},
      {path: 'location/:locationId', component: DetailsPageComponent},
      {path: 'about', component: AboutComponent},
    ])
  ],
  providers: [],
  bootstrap: [
    FrameworkComponent,
  ]
})
export class AppModule {
}
