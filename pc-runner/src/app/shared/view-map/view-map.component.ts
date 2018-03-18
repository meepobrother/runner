import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../../order.service';
import { We7Service } from '../../we7.service';

@Component({
  selector: 'view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.css']
})
export class ViewMapComponent implements OnInit {
  @ViewChild('viewmap') viewmap: ElementRef;
  bmap: any;
  walking: any;
  point: any;
  constructor(
    public order: OrderService,
    public we7: We7Service
  ) {
    this.order.watchPriceChange(['from_lat', 'from_lng', 'to_lat', 'to_lng']).debounceTime(300).subscribe(res => {
      this.setStartAndEnd();
    });
    this.we7.locChange.subscribe(res => {
      this.point = new BMap.Point(res.lng, res.lat);
      this.bmap && this.bmap.centerAndZoom(this.point, 11);
    });
  }

  watchChange() { }

  ngOnInit() {
    this.bmap = new BMap.Map(this.viewmap.nativeElement);
    this.point && this.bmap.centerAndZoom(this.point, 11);
    this.walking = new BMap.WalkingRoute(this.bmap, { renderOptions: { map: this.bmap, autoViewport: true } });
  }

  setStartAndEnd() {
    let start = new BMap.Point(this.order.form.get('from_lng').value, this.order.form.get('from_lat').value);
    let end = new BMap.Point(this.order.form.get('to_lng').value, this.order.form.get('to_lat').value);
    this.walking.search(start, end);
  }

}
