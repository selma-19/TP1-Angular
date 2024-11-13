import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
  standalone: true
})
export class RainbowDirective {
  @HostBinding('style.color') textColor: string | null = null;
  @HostBinding('style.borderColor') borderColor: string | null = null;

  private colors: string[] = ["#d5f5e3","#85c1e9","#d7bde2","#f1948a","#fcf3cf","#e59866","#40E0D0","#DE3163","#DFFF00","#FFBF00"];
  @HostListener('keyup') onKeyUp() {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.textColor = randomColor;
    this.borderColor = randomColor;
  }
  constructor() { }

}
