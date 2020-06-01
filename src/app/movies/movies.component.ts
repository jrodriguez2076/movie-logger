import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  imageList: Object[]

  constructor() { }

  ngOnInit(): void {
    this.imageList = [
      {
        image: "../../assets/images/test/poster01.jpg",
        title: "The Invisible Man"
      },
      {
        image: "../../assets/images/test/poster02.jpg",
        title: "Gretel & Hansel",
      },
      {
        image: "../../assets/images/test/poster03.jpg",
        title: "Avengers"
      },
      {
        image: "../../assets/images/test/poster04.jpg",
        title: "First Cow"
      }
    ]

    //   "../../assets/images/test/poster02.jpg",
    //   "../../assets/images/test/poster03.jpg",
    //   "../../assets/images/test/poster04.jpg"
    // ];
    // this.mediaObjects.imageList = [
    //   "The Invisible girl",
    //   "Gretel & Hansel",
    //   "Avengers",
    //   "First Cow"
    // ];
  }

}
