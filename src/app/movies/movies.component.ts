import { Component, OnInit } from '@angular/core';
import { media } from '../models/entities/mediaEntity';
import { Observable } from 'rxjs';
import { MediaService } from '../services/media.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  providers: [MediaService]
})
export class MoviesComponent implements OnInit {

  imageUrl: string = environment.tmdb_image_url;
  movieList: media[];
  upcomingList: media[];
  upcomingYifyList: Object[];
  movieList$: Observable<any>;
  upcomingList$: Observable<any>;
  upcomingYifyList$: Observable<any>;
  options: Object = {
    content: 'simplebar-content',
    scrollContent: 'simplebar-scroll-content',
    scrollbar: 'simplebar-scrollbar',
    track: 'simplebar-track'
  };

  imageList: Object[]

  constructor(private mediaService: MediaService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.movieList$ = this.mediaService.getRecommendedMedia('movie');
    this.movieList$.subscribe((resp) => {
      this.movieList = this.formatMediaInfo(resp.results);
    })

    this.upcomingList$ = this.mediaService.getUpcomingMedia('movie');
    this.upcomingList$.subscribe((resp) => {
      this.upcomingList = this.formatMediaInfo(resp.results);
    })

    this.upcomingYifyList$ = this.mediaService.getUpcomingYifyMovies();
    this.upcomingYifyList$.subscribe((resp: Response) => {
      let extractedMovies = []
      let parser = new DOMParser();
      let doc = parser.parseFromString(resp.toString(), "text/html");
      let upcomingHTML = doc.body.querySelectorAll(".home-movies")[1];
      let upcomingImages = upcomingHTML.querySelectorAll("img");
      for (let i = 0; i < upcomingImages.length; i++) {
        let trimmedSrc = upcomingImages[i].getAttribute('src').split('/');
        trimmedSrc.splice(0, 0, "https://img.yts.mx")
        extractedMovies.push({
          image: trimmedSrc.join("/"),
          title: upcomingImages[i].getAttribute('alt')
        })
        this.spinner.hide();
      }
      this.upcomingYifyList = extractedMovies;
    })
    this.spinner.show();
  }

  formatMediaInfo(mediaResults): any[] {
    let formattedMedia = [];
    const imageSize = 'w300';
    mediaResults.forEach(element => {
      formattedMedia.push({
        image: element.poster_path != null ? `${this.imageUrl}${imageSize}${element.poster_path}` : 'http://placehold.jp/0d0d0d/a22cd1/300x450.png?text=Poster%20Not%20Available',
        title: element.title,
        id: element.id,
        type: "movie"
      })
    });
    return formattedMedia
  }

}
