import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeListComponent } from './home-list/home-list.component';
import { DistancePipe } from './pipes/distance.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FrameworkComponent } from './views/framework/framework.component';


@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe,
    FrameworkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeListComponent},
    ])
  ],
  providers: [],
  bootstrap: [
    FrameworkComponent,
  ]
})
export class AppModule {
}
