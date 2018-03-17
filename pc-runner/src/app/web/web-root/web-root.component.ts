import { Component, OnInit } from '@angular/core';
declare const BMAP_STATUS_SUCCESS: any;
import { We7Service } from '../../we7.service';
@Component({
  selector: 'web-root',
  templateUrl: './web-root.component.html',
  styleUrls: ['./web-root.component.css']
})
export class WebRootComponent implements OnInit {
  constructor(
    public we7: We7Service
  ) { }

  ngOnInit() {
    var geolocation = new BMap.Geolocation();
    const that = this;
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        that.we7.address = r.address;
        that.we7.lat = r.latitude;
        that.we7.lat = r.longitude;
        that.we7.locChange.next({
          address: r.address,
          lat: r.latitude,
          lng: r.longitude
        });
      } else {
        alert('failed' + this.getStatus());
      }
    }, { enableHighAccuracy: true })
  }

}
