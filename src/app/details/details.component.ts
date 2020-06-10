import { Component, OnInit, Input, } from '@angular/core';

import { media } from '../models/entities/mediaEntity';
import { ratingEnum } from '../models/enums/ratingEnum';
import { mediaTypeEnum } from '../models/enums/mediaTypeEnum';
import { filmWorker } from '../models/entities/filmWorkerEntity';
import { DetailsService } from '../services/details.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [DetailsService]
})
export class DetailsComponent implements OnInit {
  mediaType: string;
  externalId: string;
  details: media;
  details$: Observable<any>;
  filmWorkers$: Observable<any>;
  internalId: string;
  internalId$: Observable<any>;
  externalId$: Observable<any>;
  ratedText: string;
  Cast: filmWorker[];
  Crew: filmWorker[];

  constructor(private detailsService: DetailsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mediaType = this.route.snapshot.params['type'];
    this.internalId = this.route.snapshot.params['id'];
    console.log(`${this.mediaType}, ${this.internalId}`)

    // this.internalId$ = this.detailsService.getInternalId(this.externalId);
    this.externalId$ = this.detailsService.getExternalId(this.internalId,this.mediaType);
    this.details$ = this.detailsService.getMediaDetails(this.externalId);
    this.filmWorkers$ = this.detailsService.getFilmWorkers(this.internalId);

    this.externalId$.pipe(
      switchMap(externalId => this.detailsService.getMediaDetails(externalId.imdb_id))
    )
    .subscribe(resp => {
      this.details = this.formatMediaDetails(resp, 0);
      switch (this.details.rated) {
        case (ratingEnum.G):
          this.ratedText = 'General Audiences';
          break;
        case (ratingEnum.PG):
          this.ratedText = 'Parental Guidance Suggested';
          break;
        case (ratingEnum.PG13):
          this.ratedText = 'Parental Guidance Cautioned';
          break;
        case (ratingEnum.R):
          this.ratedText = 'Restricted';
          break;
        case (ratingEnum.NC17):
          this.ratedText = 'Adults Only';
          break;
        default:
          this.ratedText = 'Rating not Found';
          break;
      }
    })

    this.filmWorkers$.subscribe((resp) => {
          this.Cast = this.formatWorker(resp["cast"],4, true);
          this.Crew = this.formatWorker(resp["crew"],4, false);
        })

  }

  formatWorker(data, count: number, isCast: Boolean): filmWorker[] {
    let Cast: filmWorker[] = [];
    for (let i = 0; i < count; i++) {
      Cast.push({
        name: data[i]['name'],
        character: isCast? data[i]['character']:"crew",
        role: isCast? "actor": data[i]['job']
      })
    }
    return Cast
  }


  formatMediaDetails(data, api): media {
    console.log(data)
    let mediaDetails: media;
    
    if (api === 0) {
      mediaDetails = {
        name: data.Title,
        releaseDate: data.Released,
        genre: data.Genre,
        synopsis: data.Plot,
        rated: parseInt(ratingEnum[data.Rated]),
        rating: data.Ratings.length === 3 
          ? { imdb: data.imdbRating, rotten: data.Ratings[1].Value, metacritic: data.Metascore }
          : { imdb: data.imdbRating, rotten: "N/A/100", metacritic: data.Metascore } ,
        imdbId: data.imdbID,
        runtime: data.Runtime,
        type: parseInt(mediaTypeEnum[data.Type]),
        tagline: "",
        poster: data.Poster,
        watched: false,
        languages: data.Language,
        country: data.country,
        cast: [],
        crew: []
      }
    }
    return mediaDetails;
  }

}
