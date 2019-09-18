import { Injectable } from '@angular/core';
import { Project } from './project.model';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	private _projects: Project[]

	constructor() {
		this._projects = [
			new Project({
				title: 'Goat <span>Alerts</span>',
				subtitle: 'Automated TradingView Bot',
				imgSrc: 'assets/img/goat-sw.png'
			}),
			new Project({
				title: 'Portfolio <span>v3</span>',
				subtitle: 'Built With AngularJS',
				imgSrc: 'assets/img/portfolio3.png'
			}),
			new Project({
				title: 'Portfolio <span>v4</span>',
				subtitle: 'Built With Angular 8',
				imgSrc: ''
			}),
		]
	}

	get projects() {
		return this._projects
	}
}
