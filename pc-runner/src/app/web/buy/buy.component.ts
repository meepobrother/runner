import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  showMore: string = 'none';
  constructor() { }

  ngOnInit() {
  }

  switchMore() {
    if (this.showMore === 'none') {
      this.showMore = 'block';
    } else {
      this.showMore = 'none';
    }
  }

}
