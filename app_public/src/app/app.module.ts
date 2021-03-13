import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeListComponent } from './views/home-list/home-list.component';
import { DistancePipe } from './pipes/distance.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FrameworkComponent } from './views/_layout/framework/framework.component';
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
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { LoadingComponent } from './views/_layout/loading/loading.component';
import { LoadingService } from './services/loading.service';
import { MessageComponent } from './views/_layout/message/message.component';
import { MessageService } from './services/message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './views/_layout/footer/footer.component';
import { HeaderComponent } from './views/_layout/header/header.component';

const layout = [
  FrameworkComponent,
  PageHeaderComponent,
  LoadingComponent,
  FooterComponent,
  HeaderComponent,
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
  RegisterComponent,
  LoginComponent,
  MessageComponent,
];

const material = [
  MatProgressSpinnerModule,
  MatInputModule,
  MatButtonModule
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
    BrowserAnimationsModule,
    ...material,
  ],
  providers: [
    LoadingService,
    MessageService,
  ],
  bootstrap: [
    FrameworkComponent,
  ]
})
export class AppModule {
}
