import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() media: {
    image: String,
    title: String,
    id: String,
    type: String
  };
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  posterClicked(event) {
    let redirectUrl = `${this.media.type}/${event.target.id}`
    this.router.navigate([redirectUrl])
  }

}
