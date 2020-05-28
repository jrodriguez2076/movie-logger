import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

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
