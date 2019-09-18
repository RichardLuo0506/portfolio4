import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { ProjectService } from './project-preview/project.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
	private _projects
	constructor(private navBarService: NavBarService, private projectService: ProjectService) { }

	ngOnInit() {
		this._projects = this.projectService.projects
	}

	get projects() {
		return this._projects
	}

	onSectionChange(sectionId: string) {
		this.navBarService.onSectionChanged(sectionId)
	}

	scrollTo(id: string) {
		document.querySelector('#' + id)
			.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
	}
}
