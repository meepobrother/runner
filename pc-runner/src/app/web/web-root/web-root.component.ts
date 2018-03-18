import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
declare const BMAP_STATUS_SUCCESS: any;
import { OrderService } from '../../order.service';
import { We7Service } from '../../we7.service';
import { LoginService } from '../../login.service';

@Component({
  selector: 'web-root',
  templateUrl: './web-root.component.html',
  styleUrls: ['./web-root.component.css']
})
export class WebRootComponent implements OnInit {
  city: string;
  constructor(
    public order: OrderService,
    public we7: We7Service,
    public cd: ChangeDetectorRef,
    public login: LoginService
  ) { }

  ngOnInit() {
    var geolocation = new BMap.Geolocation();
    const that = this;
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        that.we7.address = r.address;
        that.we7.lat = r.latitude;
        that.we7.lat = r.longitude;
        that.city = r.address.city;
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

  onLogout() {
    this.login.exit();
  }

}
