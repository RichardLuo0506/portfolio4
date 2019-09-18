import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'project-preview',
	templateUrl: './project-preview.component.html',
	styleUrls: ['./project-preview.component.sass']
})
export class ProjectPreviewComponent implements OnInit {

	@Input() data
	constructor() { }

	ngOnInit() { }
}
