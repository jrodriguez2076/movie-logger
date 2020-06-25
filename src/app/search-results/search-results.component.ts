import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { media } from '../models/entities/mediaEntity';
import { MediaService } from '../services/media.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
  mediaType: string;

  constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.query = params.query;
        this.mediaType = params.type;
        this.searchResults$ = this.mediaService.searchMedia(this.query, this.mediaType);
        this.searchResults$.subscribe(resp => {
          this.searchResults = this.formatMediaInfo(resp.results);
          this.spinner.hide();
        })
      });
    this.spinner.show();
  }

  formatMediaInfo(mediaResults): any[] {
    let formattedMedia = [];
    const imageSize = 'w300';
    mediaResults.forEach(element => {
      formattedMedia.push({
        image: element.poster_path != null ? `${this.imageUrl}${imageSize}${element.poster_path}` : 'http://placehold.jp/0d0d0d/a22cd1/300x450.png?text=Poster%20Not%20Available',
        title: element.title ? element.title : element.name,
        id: element.id,
        type: this.mediaType
      })
    });
    return formattedMedia
  }
}
