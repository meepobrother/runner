import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  list: any[] = [{
    title: '随意购',
    id: '1',
    active: true
  }, {
    title: '咖啡',
    id: '2'
  }, {
    title: '香烟',
    id: '3'
  }, {
    title: '酒',
    id: '4'
  }, {
    title: '早餐',
    id: '5'
  }, {
    title: '夜宵',
    id: '6'
  }, {
    title: '药品',
    id: '7'
  }, {
    title: '生鲜',
    id: '8'
  }];
  constructor() { }

  ngOnInit() {
  }

  selectItem(item: any) {
    this.list.map(res => {
      res.active = false;
    });
    item.active = true;
  }

}
