import { Directive, Input, Renderer2, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
@Directive({
  selector: '[we7-src]'
})
export class We7SrcDirective {
  @Input('we7-src') src: string;
  constructor(
    public render: Renderer2,
    public ele: ElementRef
  ) { }

  ngOnInit() {
    this.render.setAttribute(this.ele.nativeElement, 'src', environment.publicPath + this.src);
  }

}
