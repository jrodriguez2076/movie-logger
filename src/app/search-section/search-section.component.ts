import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { mediaTypeEnum } from '../models/enums/mediaTypeEnum'
import { types } from 'util';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent implements OnInit {
  types = [
    {
      type: mediaTypeEnum.movie,
      icon: 'movie',
      value: 'movie',
    },
    {
      type: mediaTypeEnum.tvShow,
      icon: 'tv',
      value: 'tv',
    }
  ];

  mediaTypes = mediaTypeEnum;
  searchFormGroup: FormGroup;
  typeForm: mediaTypeEnum = mediaTypeEnum.movie;
  searchQueryForm: string;

  constructor( private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.searchFormGroup = new FormGroup({
      'type': new FormControl(this.typeForm),
      'searchQuery': new FormControl(this.searchQueryForm)
    })
  }

  startSearch() {
    this.router.navigate(['/search'], { queryParams: { query: this.searchFormGroup.controls['searchQuery'].value, type: this.searchFormGroup.controls['type'].value.value } })
  }

}
