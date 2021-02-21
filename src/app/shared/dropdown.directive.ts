import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // @HostBinding('class.show') isShow = false;
  // @HostListener('document:click', ['$event']) toggleShow(event: Event) {
  //   this.isShow = this.el.nativeElement.contains(event.target) ? !this.isShow : false;
  // }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen(): void {
    this.isOpen = !this.isOpen;
    let part = this.elRef.nativeElement.querySelector('.dropdown-menu');
    if (this.isOpen) {
      this.renderer.addClass(part, 'show');
    } else {
      this.renderer.removeClass(part, 'show');
    }
  }
}


