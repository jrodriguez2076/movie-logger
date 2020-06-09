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

    getRecommendedMovies(): Observable<any> {
        let  recommendedUrl= `${this.tmdbUrl}movie/popular?api_key=${this.tmdbApiKey}&i=tt1051906`;
        return this.http.get(recommendedUrl)
    }

    getUpcomingMovies(): Observable<any> {
        let  upcomingUrl= `${this.tmdbUrl}movie/upcoming?api_key=${this.tmdbApiKey}&i=tt1051906`;
        return this.http.get(upcomingUrl)
    }

    getUpcomingYifyMovies(): Observable<any> {
        let ytsUrl = 'https://yts.mx/';
        return this.http.get(ytsUrl,{responseType: 'text'})
    }

}