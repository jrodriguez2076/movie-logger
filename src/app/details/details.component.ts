import { Component, OnInit, Input, } from '@angular/core';

import { media } from '../models/entities/mediaEntity';
import { ratingEnum } from '../models/enums/ratingEnum';
import { mediaTypeEnum } from '../models/enums/mediaTypeEnum';
import { filmWorker } from '../models/entities/filmWorkerEntity';
import { DetailsService } from '../services/details.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [DetailsService]
})
export class DetailsComponent implements OnInit {
  @Input() mediaId: string;
  details: media;
  details$: Observable<any>;
  filmWorkers$: Observable<any>;
  internalId: string;
  internalId$: Observable<any>;
  ratedText: string;
  Cast: filmWorker[];
  Crew: filmWorker[];
  constructor(private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.details$ = this.detailsService.getMediaDetails(this.mediaId);
    this.internalId$ = this.detailsService.getInternalId(this.mediaId);

    this.details$.subscribe((resp) => {
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
      }
    });

    this.internalId$.subscribe((resp) => {
      this.internalId = resp["movie_results"][0]["id"]
      this.filmWorkers$ = this.detailsService.getFilmWorkers(this.internalId);
      this.filmWorkers$.subscribe((resp) => {
        this.Cast = this.formatWorker(resp["cast"],4, true);
        this.Crew = this.formatWorker(resp["crew"],4, false);
      })
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
  
  // formatCrew(data, count): filmWorker[] {
  //   let crew: filmWorker[];
  //   for (let i = 0; i < count; i++) {
  //     Cast.push({
  //       name: data["cast"][i]['name'],
  //       character: data["cast"][i]['character'],
  //       role: "actor"
  //     })
  //   }
  //   return Cast
  // }


  formatMediaDetails(data, api): media {
    let mediaDetails: media;
    if (api === 0) {
      mediaDetails = {
        name: data.Title,
        releaseDate: data.Released,
        genre: data.Genre,
        synopsis: data.Plot,
        rated: parseInt(ratingEnum[data.Rated]),
        rating: { imdb: data.imdbRating, rotten: "", metacritic: data.Metascore },
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
