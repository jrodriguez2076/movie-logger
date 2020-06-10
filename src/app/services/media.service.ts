import { media } from '../models/entities/mediaEntity'
import { ratingEnum } from '../models/enums/ratingEnum'
import { mediaTypeEnum } from '../models/enums/mediaTypeEnum'
import { filmWorker } from '../models/entities/filmWorkerEntity';
import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import request from 'request'

@Injectable()
export class MediaService {
    tmdbApiKey: string = environment.tmdb_api_key;
    tmdbUrl: string = environment.tmdb_url;

    constructor(private http: HttpClient){}

    getRecommendedMedia(mediaType): Observable<any> {
        let  recommendedUrl= `${this.tmdbUrl}${mediaType}/popular?api_key=${this.tmdbApiKey}`;
        return this.http.get(recommendedUrl)
    }

    getUpcomingMedia(mediaType): Observable<any> {
        let  upcomingUrl= `${this.tmdbUrl}${mediaType}/upcoming?api_key=${this.tmdbApiKey}`;
        return this.http.get(upcomingUrl)
    }

    getCurrentMedia(mediaType): Observable<any> {
        let  currentUrl= `${this.tmdbUrl}${mediaType}/airing_today?api_key=${this.tmdbApiKey}&language=en-US&page=1`;
        return this.http.get(currentUrl)
    }

    getUpcomingYifyMovies(): Observable<any> {
        let ytsUrl = 'https://yts.mx/';
        return this.http.get(ytsUrl,{responseType: 'text'})
    }

    searchMedia(query, mediaType): Observable<any> {
        let searchUrl = `${this.tmdbUrl}search/${mediaType}?api_key=${this.tmdbApiKey}&language=en-US&page=1&include_adult=true&query=${query}`;
        return this.http.get(searchUrl);
    }

}