import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { media } from '../models/entities/mediaEntity';
import { MediaService } from '../services/media.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  providers: [MediaService]
})
export class SearchResultsComponent implements OnInit {
  imageUrl: string = environment.tmdb_image_url;;
  query: string;
  searchResults: media[];
  searchResults$: Observable<any>;

  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    this.query = "star wars";
    this.searchResults$ = this.mediaService.searchMedia(this.query,'movie');

    this.searchResults$.subscribe(resp => {
      console.log(resp)
      this.searchResults = this.formatMediaInfo(resp.results);
    })
  }

  formatMediaInfo(mediaResults): any[] {
    let formattedMedia = [];
    const imageSize = 'w300';
    mediaResults.forEach(element => {
      formattedMedia.push({
        image: element.poster_path != null? `${this.imageUrl}${imageSize}${element.poster_path}`: 'http://placehold.jp/0d0d0d/a22cd1/300x450.png?text=Poster%20Not%20Available',
        title: element.title? element.title: element.name,
        id: element.id,
      })
    });
    return formattedMedia
  }
}
