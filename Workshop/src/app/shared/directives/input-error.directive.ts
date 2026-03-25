import { Directive, ElementRef, HostBinding, OnInit, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputError]',
  standalone: true
})
export class InputErrorDirective implements OnInit {
  private el = inject(ElementRef);
  private control = inject(NgControl, { optional: true });

  @HostBinding('class.input-error') get hasError(): boolean {
    return (this.control?.invalid && this.control?.touched) || false;
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.remove('input-error');
  }
}
