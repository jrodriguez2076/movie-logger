import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { media } from '../models/entities/mediaEntity';
import { Observable } from 'rxjs';
import { MediaService } from '../services/media.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
  providers: [MediaService]
})
export class TvShowsComponent implements OnInit {

  imageList: string[];
  imageUrl: string = environment.tmdb_image_url;
  tvShowList: media[];
  latestList: media[];
  tvShowList$: Observable<any>;
  latestList$: Observable<any>;
  options: Object = {
    content: 'simplebar-content',
    scrollContent: 'simplebar-scroll-content',
    scrollbar: 'simplebar-scrollbar',
    track: 'simplebar-track'
  };

  constructor(private mediaService: MediaService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.tvShowList$ = this.mediaService.getRecommendedMedia('tv');
    this.tvShowList$.subscribe((resp) => {
      this.tvShowList = this.formatMediaInfo(resp.results);
    })

    this.latestList$ = this.mediaService.getCurrentMedia('tv');
    this.latestList$.subscribe((resp)=>{
      this.latestList = this.formatMediaInfo(resp.results);
    this.spinner.hide();
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
        type: "tv"
      })
    });
    return formattedMedia
  }
}
