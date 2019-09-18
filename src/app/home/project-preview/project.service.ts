import { Injectable } from '@angular/core';
import { Project } from './project.model';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	private _projects: Project[]

	constructor() {
		this._projects = [
			new Project('Goat <span>Alerts</span>', 'Automated TradingView Bot'),
			new Project('Portfolio v4', 'Built With Angular 8'),
		]
	}

	get projects() {
		return this._projects
	}
}
