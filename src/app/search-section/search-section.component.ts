import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent implements OnInit {
  types = [
    {
      type: 'Movie',
      icon: 'movie'
    },
    {
      type: 'TV',
      icon: 'tv'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
