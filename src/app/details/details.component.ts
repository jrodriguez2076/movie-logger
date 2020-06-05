import { Component, OnInit } from '@angular/core';

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
  details: media;
  details$: Observable<any>;
  ratedText: string;
  constructor(private detailsService: DetailsService){}

  ngOnInit(): void {
    this.details$ = this.detailsService.getMediaDetails();

    this.details$.subscribe((resp) => {
      console.log(ratingEnum[resp.Rated])
      console.log(resp)
      this.details = this.formatMediaDetails(resp,0);
      switch(this.details.rated) {
        case(ratingEnum.G):
          this.ratedText = "General Audiences";
          break;
        case(ratingEnum.PG):
          this.ratedText = "Parental Guidance Suggested";
          break;
        case(ratingEnum.PG13):
          this.ratedText = "Parental Guidance Cautioned";
          break;
        case(ratingEnum.R):
          this.ratedText = "Restricted";
          break;
        case(ratingEnum.NC17):
          this.ratedText = "Adults Only";
          break;
      }
    });
    // this.details = this.detailsService.gethardDetails();
  }

  formatMediaDetails(data,api): media {
    let mediaDetails: media;
    if (api== 0) {
      mediaDetails = {
        name: data.Title,
        releaseDate: data.Released,
        genre: data.Genre,
        synopsis: data.Plot,
        rated: parseInt(ratingEnum[data.Rated]),
        rating: {imdb: data.imdbRating, rotten:"",metacritic:data.Metascore},
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
