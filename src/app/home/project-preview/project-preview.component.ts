import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'project-preview',
	templateUrl: './project-preview.component.html',
	styleUrls: ['./project-preview.component.sass'],
	encapsulation: ViewEncapsulation.None
})
export class ProjectPreviewComponent implements OnInit {

	@Input() data
	constructor() { }

	ngOnInit() { }
}
