import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MoviesComponent } from './movies/movies.component'
import { TvShowsComponent } from './tv-shows/tv-shows.component'
import { DetailsComponent } from './details/details.component'
import { SearchResultsComponent } from './search-results/search-results.component'


const appRoutes: Routes = [
    { path: 'movie', component: MoviesComponent },
    { path: 'tv', component: TvShowsComponent },
    { path: ':type/search', component: SearchResultsComponent },
    { path: ':type/:id', component: DetailsComponent },
    { path: '',   redirectTo: '/movie', pathMatch: 'full' }
  ] 

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}