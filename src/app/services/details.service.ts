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
    omdbApiKey: string = environment.omdb_api_key;
    detailsUrl: string = environment.omdb_url;
    tmdbApiKey: string = environment.tmdb_api_key;
    tmdbUrl: string = environment.tmdb_url;
    internalId: string;
    internalId$: Observable<any>;

    constructor(private http: HttpClient){}

    getMediaDetails(imdbId): Observable<any> {
        let omdbApiUrl = `${this.detailsUrl}?apikey=${this.omdbApiKey}&i=${imdbId}`;
        return this.http.get(omdbApiUrl)
    }

    getFilmWorkers(internalId): Observable<any> {
        let  filmworkerUrl= `${this.tmdbUrl}movie/${internalId}/credits?api_key=${this.tmdbApiKey}`;
        return this.http.get(filmworkerUrl)
    }

    getInternalId(id): Observable<any> {
        let  findbyImdbIdUrl= `${this.tmdbUrl}find/${id}?api_key=${this.tmdbApiKey}&external_source=imdb_id`;
        return this.http.get(findbyImdbIdUrl)
    }

}