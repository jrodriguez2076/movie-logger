import { Component, OnInit } from '@angular/core';
import { media } from '../models/entities/mediaEntity';
import { Observable } from 'rxjs';
import { MediaService } from '../services/media.service';
import { environment } from 'src/environments/environment';

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
    content: 'pepito',
    scrollContent: 'simplebar-scroll-content',
    scrollbar: 'simplebar-scrollbar',
    track: 'simplebar-track'
  };

  imageList: Object[]

  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    

    this.movieList$ = this.mediaService.getRecommendedMovies();
    this.movieList$.subscribe((resp) => {
      this.movieList = this.formatMediaInfo(resp.results);
    })

    this.upcomingList$ = this.mediaService.getUpcomingMovies();
    this.upcomingList$.subscribe((resp) => {
      this.upcomingList = this.formatMediaInfo(resp.results);
    })

    this.upcomingYifyList$ = this.mediaService.getUpcomingYifyMovies();
    this.upcomingYifyList$.subscribe((resp: Response) => {
      let data = resp;
      let parser = new DOMParser();
      let doc = parser.parseFromString(data.toString(), "text/html");
      let upcomingHTML = doc.body.querySelectorAll(".home-movies")[1];
      let upcomingImages = upcomingHTML.querySelectorAll("img");
      let extractedMovies = []

      for (let i = 0; i < upcomingImages.length; i++) {
        // let trimmedSrc = "/assets/images/movies/once_upon_a_time_in_hollywood_2019/medium-cover.jpg".split("/")
        let trimmedSrc = upcomingImages[i].getAttribute('src').split('/');

        trimmedSrc.splice(0, 0, "https://img.yts.mx")
        extractedMovies.push({
          image: trimmedSrc.join("/"),
          title: upcomingImages[i].getAttribute('alt')
        })

      }
      this.upcomingYifyList = extractedMovies
      console.log(this.upcomingYifyList)


    })
  }

  formatMediaInfo(mediaResults): any[] {
    let formattedMedia = [];
    const imageSize = 'w300';
    mediaResults.forEach(element => {
      formattedMedia.push({
        image: `${this.imageUrl}${imageSize}${element.poster_path}`,
        title: element.title,
        id: element.id,
      })
    });
    return formattedMedia
  }

}
