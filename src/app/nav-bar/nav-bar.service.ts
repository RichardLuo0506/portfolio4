import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable()
export class NavBarService {
	@Output() sectionChanged: EventEmitter<string> = new EventEmitter();

	onSectionChanged() {
		this.sectionChanged.emit('boob');
	}
}