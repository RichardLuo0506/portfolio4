import { Directive, Injectable, Input, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';
import { WindowRef } from './window-ref.service';

@Directive({
	selector: '[scrollSpy]'
})
export class ScrollSpyDirective {
	@Input() public spiedTags = [];
	@Output() public sectionChange = new EventEmitter<string>();
	private currentSection: string;

	constructor(private _el: ElementRef, private winRef: WindowRef) { }

	@HostListener('window:scroll', ['$event'])
	onWindowScroll(event: any) {
		console.log('scroll');
		let currentSection: string;
		const children = this._el.nativeElement.children;
		const scrollTop = this.winRef.nativeWindow.scrollY;

		for (let i = 0; i < children.length; i++) {
			const element = children[i];
			if (this.spiedTags.some(spiedTag => spiedTag === element.tagName)) {
				if ((element.offsetTop) <= scrollTop) {
					currentSection = element.getAttribute('data-section-title');
				}
			}
		}
		if (currentSection !== this.currentSection) {
			this.currentSection = currentSection;
			this.sectionChange.emit(this.currentSection);
		}
	}
}
