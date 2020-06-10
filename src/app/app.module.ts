import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule,  } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import { MovieCardComponent } from './movie-card/movie-card.component'; 
import {MatCardModule} from '@angular/material/card';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { MoviesComponent } from './movies/movies.component';
import { DetailsComponent } from './details/details.component'; 
import { HttpClientModule }    from '@angular/common/http';
import { SimplebarAngularModule } from 'simplebar-angular';
import { AppRoutingModule } from './app-routing.module';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    MovieCardComponent,
    TvShowsComponent,
    MoviesComponent,
    DetailsComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    SimplebarAngularModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
