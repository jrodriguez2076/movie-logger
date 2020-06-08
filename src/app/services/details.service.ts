import { media } from '../models/entities/mediaEntity'
import { ratingEnum } from '../models/enums/ratingEnum'
import { mediaTypeEnum } from '../models/enums/mediaTypeEnum'
import { filmWorker } from '../models/entities/filmWorkerEntity';
import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class DetailsService {

    constructor(private http: HttpClient){}

    // details: media = {
    //     name: "The Invisible Man",
    //     releaseDate: new Date(),
    //     genre: "Horror / Thriller",
    //     synopsis: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in  culpa qui officia deserunt mollit anim id est laborum.",
    //     rated: ratingEnum.PG13,
    //     rating: 7.4,
    //     imdbId: 11,
    //     runtime: 120.5,
    //     type: mediaTypeEnum.movie,
    //     tagline: "Where the fuck is he?",
    //     poster: "poster",
    //     watched: false,
    //     languages: ['en', 'spa'],
    //     country: 'USA',
    //     cast: [
    //       {
    //         name: "Elisabeth Moss",
    //         role: "cast",
    //         character: "",
    //       },
    //       {
    //         name: "Oliver Jackson-Cohen",
    //         role: "cast",
    //         character: "",
    //       },
    //       {
    //         name: "Harriet Dyer",
    //         role: "cast",
    //         character: "",
    //       }
    //     ],
    //     crew: [
    //       {
    //         name: "Leigh Whannell",
    //         role: "Director",
    //         character: "",
    //       },
    //       {
    //         name: "Leigh Whannell",
    //         role: "Screenplay",
    //         character: "",
    //       },
    //       {
    //         name: "Leigh Whannell",
    //         role: "Screen Story",
    //         character: "",
    //       }
    //     ]
    //   }

    getMediaDetails(): Observable<any> {
        let omdbApiUrl = `http://www.omdbapi.com/?apikey=${environment.omdb_api_key}&t=the+invisible+man`;
        return this.http.get(omdbApiUrl)
    }

    getMediaPoster(): string {
        // TMDB API - getImages
        return "placeholder poster";
    }

    getFilmWorkers(): filmWorker[] {
        // TMDB API - getCredits
        let filmWorkerList = [
            {
                name: "Leigh Whannell",
                role: "Director",
                character: "",
              },
        ]
        return filmWorkerList;
    }

    getMediaImage(url) {
        console.log(url)
    }
}