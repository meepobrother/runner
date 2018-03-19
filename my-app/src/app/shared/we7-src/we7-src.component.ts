import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Directive({
    selector: '[we7-src]'
)
export class We7SrcComponent implements OnInit {
    @Input('we7-src') src: string;
    constructor(
        private http: _HttpClient,
        private ele: ElementRef,
        private render: Renderer2
    ) { }

    ngOnInit() {
        this.render.setStyle(this.ele.nativeElement, 'display', 'none');
        this.load();
    }

    load() {
        const img = new Image();
        img.src = this.src;
        img.onload = () => {
            this.render.setAttribute(this.ele.nativeElement, 'src', this.src);
            this.render.setStyle(this.ele.nativeElement, 'display', 'block');
        };
    }

}
