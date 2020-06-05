import { filmWorker } from './filmWorkerEntity';
import { mediaTypeEnum } from '../enums/mediaTypeEnum';
import { ratingEnum } from '../enums/ratingEnum';
import { rating } from './ratingEntity';

export class media {
    name: string;
    synopsis: string;
    imdbId: number;
    type: mediaTypeEnum;
    poster: string;
    genre: string;
    languages: string[];
    releaseDate: Date;
    country: string;
    rated: ratingEnum;
    cast: filmWorker[];
    crew: filmWorker[];
    watched: boolean;
    runtime: number;
    tagline: string;
    rating: rating;
}