import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'system-tips',
  templateUrl: './system-tips.component.html',
  styleUrls: ['./system-tips.component.css']
})
export class SystemTipsComponent implements OnInit {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  constructor(
    public menu: MenuService
  ) { }

  ngOnInit() {
  }

  close() {
    this.onClose.emit();
  }

}
