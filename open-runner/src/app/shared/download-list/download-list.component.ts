import { Component, OnInit } from '@angular/core';
import { We7Service } from '../../we7.service';

@Component({
  selector: 'download-list',
  templateUrl: './download-list.component.html',
  styleUrls: ['./download-list.component.css']
})
export class DownloadListComponent implements OnInit {
  url: string;
  constructor(
    public we7: We7Service
  ) { }

  ngOnInit() {
    this.url = this.we7.getWebUrl('open', { open: 'download' });
  }

}
