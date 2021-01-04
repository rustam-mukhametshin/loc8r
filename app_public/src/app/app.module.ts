import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeListComponent } from './home-list/home-list.component';
import { DistancePipe } from './pipes/distance.pipe';


@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [
    HomeListComponent
  ]
})
export class AppModule {
}
