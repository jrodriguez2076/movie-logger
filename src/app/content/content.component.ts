import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  mediaId : string;
  
  constructor() { }

  ngOnInit(): void {
    this.mediaId = "tt1051906";
  }

  

}
