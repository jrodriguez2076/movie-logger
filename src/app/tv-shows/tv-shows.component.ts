import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {
  imageList: string[];

  constructor() { }

  ngOnInit(): void {
    this.imageList = [
      "../../assets/images/test/poster01.jpg",
      "../../assets/images/test/poster02.jpg",
      "../../assets/images/test/poster03.jpg",
      "../../assets/images/test/poster04.jpg"
    ]
  }

}
